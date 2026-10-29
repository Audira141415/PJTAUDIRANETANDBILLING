with open(r'f:\AUDIRA-NET-BILLING\AUDIRA-NET\lib\screens\customer\payment_page.dart', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("'1234567890'", "'8077708123456789'")
text = text.replace("'9876543210'", "'8801208123456789'")
text = text.replace("'5555666677'", "'8277081234567890'")

with open(r'f:\AUDIRA-NET-BILLING\AUDIRA-NET\lib\screens\customer\payment_page.dart', 'w', encoding='utf-8') as f:
    f.write(text)

print('Updated payment_page.dart VA numbers successfully!')

