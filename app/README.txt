## LtC Documentation App

The LtC documentation app is a small web application written with Python Flask 2.13 and Python 3.10.5 in PyCharm.
When run, the application generates the terms list and quick reference guide from the csv files stored in the data/ltc-set
folder. The CSV source files were generated manually from the original source data (see source folder in the LtC repo).
In order to use this app to generate documentation, the fields in the CSV must be strictly adhered, both the column
names and column order must be maintained. Please see the schema files for specifics regarding each csv file. The original documentation styles were adjusted to improve readability and contrast. In addition, a print stylesheet was added to improve print media.

- app.py - Test pages
- pages.py - Production, generates static html version of the test pages
Changes to app.py script must be propagated to the pages.py file to push to the site. Changes to the CSV files, assets, or templates are automatically propagated to the static build.

To build documentation pages
(Change the ltc prefix to the name of your choice)
1. Create three CSV files located under data/ltc-set
2. Create virtual environment
>python -m venv venv
3. Install requirements using pip (If you don't have PIP installed, go here: https://pypi.org/project/pip/)
>pip install -r requirements.txt
4. Run test page
>python app.py
5. Open browser and enter the url: localhost:5000
6. The LtC website should now be displayed.
To build the webpages for production
1. Run the build version
>python pages.py build

To-do
1. Finalize the print stylesheet
2. Test 508
3. Review content
4. Test Anchor Links

Ben Norton
michaelnorton.ben@gmail.com
20230716
