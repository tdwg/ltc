from flask import Flask, render_template
import markdown
import markdown.extensions.fenced_code
from pygments.formatters import HtmlFormatter
from markdown.extensions.codehilite import CodeHiliteExtension

CustomHtmlFormatter = HtmlFormatter(style="emacs",full=True,cssclass="codehilite")
css_string = CustomHtmlFormatter.get_style_defs()

app = Flask(__name__)

@app.route('/')
def mdtest():
    md = open("templates/markdown/ac-content.md", "r")
    md_content = markdown.markdown(
        md.read(), extensions=[CodeHiliteExtension(pygments_formatter=CustomHtmlFormatter)],
    )

    return render_template(
        "md-test.html",
        title="Markdown Test",
        md_content=md_content
    )


if (__name__ == "__main__"):
    app.run(port = 5000, debug=True)