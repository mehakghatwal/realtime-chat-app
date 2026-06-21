import os
import sys
import markdown
from xhtml2pdf import pisa

def convert_md_to_pdf(md_path, pdf_path):
    print(f"Reading markdown from: {md_path}")
    with open(md_path, 'r', encoding='utf-8') as f:
        md_content = f.read()

    # Convert Markdown to HTML
    html_content = markdown.markdown(
        md_content,
        extensions=['extra', 'codehilite', 'toc']
    )

    # Wrap in standard HTML template with VIOLET/PURPLE styling
    styled_html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            @page {{
                size: letter;
                margin: 0.8in;
            }}
            body {{
                font-family: 'Helvetica', 'Arial', sans-serif;
                font-size: 10pt;
                line-height: 1.5;
                color: #2D3748;
            }}
            h1, h2, h3, h4 {{
                color: #4C1D95;
                font-weight: bold;
                font-family: 'Helvetica', 'Arial', sans-serif;
            }}
            h1 {{
                font-size: 20pt;
                border-bottom: 2px solid #6D28D9;
                padding-bottom: 6px;
                margin-top: 20px;
                margin-bottom: 20px;
            }}
            h2 {{
                font-size: 15pt;
                border-bottom: 1px solid #DDD6FE;
                padding-bottom: 3px;
                margin-top: 25px;
                margin-bottom: 15px;
                color: #5B21B6;
            }}
            h3 {{
                font-size: 12pt;
                margin-top: 20px;
                margin-bottom: 10px;
                color: #6D28D9;
            }}
            h4 {{
                font-size: 10.5pt;
                margin-top: 15px;
                margin-bottom: 5px;
                color: #7C3AED;
            }}
            p {{
                margin-bottom: 12px;
                text-align: justify;
            }}
            a {{
                color: #6D28D9;
                text-decoration: none;
            }}
            hr {{
                border: 0;
                border-top: 1px solid #DDD6FE;
                margin-top: 20px;
                margin-bottom: 20px;
            }}
            ul, ol {{
                margin-bottom: 15px;
                padding-left: 20px;
            }}
            li {{
                margin-bottom: 5px;
            }}
            /* Code styling */
            pre {{
                background-color: #F5F3FF;
                border: 1px solid #DDD6FE;
                border-radius: 4px;
                padding: 10px;
                margin-top: 10px;
                margin-bottom: 15px;
                font-family: 'Courier New', Courier, monospace;
                font-size: 8.5pt;
            }}
            code {{
                font-family: 'Courier New', Courier, monospace;
                font-size: 9pt;
                background-color: #EDE9FE;
                color: #6D28D9;
                padding: 2px 4px;
                border-radius: 3px;
            }}
            pre code {{
                background-color: transparent;
                padding: 0;
                color: #2D3748;
                border-radius: 0;
            }}
            /* Table styling */
            table {{
                width: 100%;
                border-collapse: collapse;
                margin-top: 15px;
                margin-bottom: 15px;
            }}
            th, td {{
                border: 1px solid #DDD6FE;
                padding: 8px 10px;
                text-align: left;
                font-size: 9pt;
            }}
            th {{
                background-color: #6D28D9;
                font-weight: bold;
                color: white;
            }}
            tr:nth-child(even) {{
                background-color: #F5F3FF;
            }}
            /* Image styling */
            img {{
                width: 320pt;
                height: 320pt;
                display: block;
                margin: 20px auto;
                border: 1.5px solid #6D28D9;
            }}
        </style>
    </head>
    <body>
        {html_content}
    </body>
    </html>
    """

    print(f"Writing PDF to: {pdf_path}")
    with open(pdf_path, "wb") as pdf_file:
        pisa_status = pisa.CreatePDF(styled_html, dest=pdf_file)
        
    if pisa_status.err:
        print(f"Error converting {md_path} to PDF.")
        return False
    else:
        print(f"Successfully converted to {pdf_path}")
        return True

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python convert_pdf.py <input_md_file> <output_pdf_file>")
        sys.exit(1)
    
    input_md = sys.argv[1]
    output_pdf = sys.argv[2]
    
    success = convert_md_to_pdf(input_md, output_pdf)
    if not success:
        sys.exit(1)
