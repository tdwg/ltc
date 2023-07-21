import markdown
from flask import Flask, render_template
import markdown.extensions.fenced_code
from pygments.formatters import HtmlFormatter

#formatter = HtmlFormatter(style="emacs",full=True,cssclass="codehilite")
#css_string = formatter.get_style_defs()

app = Flask(__name__)
# https://rudra.dev/posts/rendering-markdown-from-flask/

@app.route("/md")
def index():
    readme_file = open("templates/markdown/home-content.md", "r")
    md_template_string = markdown.markdown(
        readme_file.read(), extensions=["fenced_code", "codehilite"]
    )

    # Generate Css for syntax highlighting
    formatter = HtmlFormatter(style="emacs", full=True, cssclass="codehilite")
    css_string = formatter.get_style_defs()
    md_css_string = "<style>" + css_string + "</style>"

    md_template = md_css_string + md_template_string
    return md_template

#https://blog.jcharistech.com/2019/12/12/how-to-render-markdown-in-flask/
@app.route('/md-alt')
def mdalt():
    readme_file = open("templates/markdown/home-content.md", "r")
    md_content = markdown.markdown(
        readme_file.read(), extensions=["fenced_code"]
    )
    return render_template(
        "tests/md-test.html",
        md_content=md_content
    )

if (__name__ == "__main__"):
    app.run(port = 5000, debug=True)
