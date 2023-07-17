  # LtC Documentation App
Flask App that generates the Terms List and Quick Reference Guide for the Latimer Core Standard. Documentation is based on the CSV files under data/ltc-set, which are transformed versions of the original source csv files located under tdwg/ltc/docs/terms/source. 
The documentation pages are based on the standards documentation TDWG webpages. The original documentation styles were adjusted to 
improve readability and contrast. In addition, a print stylesheet was added to improve print media.

  1. Create Virtual Environment
  2. Install Requirements (pip)
  3. Run App >python app.py
  4. Open localhost:5000 in browser

Assuming Windows 10/11
>python -m venv venv
>venv\Scripts\activate.bat
>pip install -r requirements.txt
>python app.py

To-do
1. Finalize the print stylesheet
2. Test 508
3. Review content
4. Test Anchor Links

Ben Norton
michaelnorton.ben@gmail.com
20230716
