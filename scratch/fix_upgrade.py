path = r'F:\AUDIRA-NET-BILLING\AUDIRA-NET\lib\screens\customer\package_upgrade_page.dart'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

old_snippet = """      final cId = customer['id']?.toString() ?? customer['customerId']?.toString() ?? 'usr-customer-01';
      final parsedSpeed = _parseSpeed(customer['speed']);
      final fee = (customer['monthlyFee'] is num)
          ? (customer['monthlyFee'] as num).toInt()
          : int.tryParse(customer['monthlyFee']?.toString() ?? '0') ?? 0;

      setState(() {
        _customerData = customer;
        _currentPackage = {
          'name': customer['packageName'] ?? 'AUDIRA Fiber Ultra 50 Mbps',
          'speed': parsedSpeed > 0 ? parsedSpeed : 50,
          'speedRaw': customer['speed']?.toString() ?? '$parsedSpeed Mbps',
          'price': fee > 0 ? fee : 250000,
        };
      });"""

new_snippet = """      final safeCustomer = customer!;
      final cId = safeCustomer['id']?.toString() ?? safeCustomer['customerId']?.toString() ?? 'usr-customer-01';
      final parsedSpeed = _parseSpeed(safeCustomer['speed']);
      final fee = (safeCustomer['monthlyFee'] is num)
          ? (safeCustomer['monthlyFee'] as num).toInt()
          : int.tryParse(safeCustomer['monthlyFee']?.toString() ?? '0') ?? 0;

      setState(() {
        _customerData = safeCustomer;
        _currentPackage = {
          'name': safeCustomer['packageName'] ?? 'AUDIRA Fiber Ultra 50 Mbps',
          'speed': parsedSpeed > 0 ? parsedSpeed : 50,
          'speedRaw': safeCustomer['speed']?.toString() ?? '$parsedSpeed Mbps',
          'price': fee > 0 ? fee : 250000,
        };
      });"""

text = text.replace('\r\n', '\n')
if old_snippet in text:
    text = text.replace(old_snippet, new_snippet)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(text)
    print("SUCCESS")
else:
    print("NOT FOUND")
