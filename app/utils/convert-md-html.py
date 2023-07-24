import gh_md_to_html
import markdown
from configparser import ConfigParser

relpath = "../"

config = ConfigParser()
config.read(relpath +'config.py')
testmd = config['MD']
md = relpath + testmd['test_md']
# Test with AC Content Markdown
markdown.markdownFromFile(input=md, output='ac-content.html', extensions=['tables'])

