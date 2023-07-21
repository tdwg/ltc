@environmentfilter
def markdown(env, value):
    """
    Markdown filter with support for extensions.
    """
    try:
        import markdown as md
    except ImportError:
        log.error(u"Cannot load the markdown library.")
        raise TemplateError(u"Cannot load the markdown library")
    output = value
    # insert custom markdown extensions here
    extensions = ['markdown.extensions.meta',
                  'markdown.extensions.headerid',
                  'markdown.extensions.attr_list',
                  'markdown.extensions.toc',
                  'markdown.extensions.def_list']

    d = dict()
    d['extensions'] = list()
    d['extensions'].extend(extensions)

    marked = md.Markdown(**d)

    return marked.convert(output)


class Markdown(Extension):
    """
    A wrapper around the markdown filter for syntactic sugar.
    """
    tags = set(['markdown'])

    def parse(self, parser):
        """
        Parses the statements and defers to the callback
        for markdown processing.
        """
        lineno = next(parser.stream).lineno
        body = parser.parse_statements(['name:endmarkdown'], drop_needle=True)

        return nodes.CallBlock(
            self.call_method('_render_markdown'),
            [], [], body).set_lineno(lineno)

    def _render_markdown(self, caller=None):
        """
        Calls the markdown filter to transform the output.
        """
        if not caller:
            return ''
        output = caller().strip()
        return markdown(self.environment, output)