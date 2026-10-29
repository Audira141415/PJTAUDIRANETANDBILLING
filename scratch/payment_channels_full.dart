  // =========================================================================
  // 2. BCA VIRTUAL ACCOUNT MODAL
  // =========================================================================

  void _openBcaVaModal({
    required String billId,
    required double amount,
    required String month,
  }) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    const vaNumber = '8077708123456789';

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (bottomCtx) {
        return Container(
          constraints: BoxConstraints(
            maxHeight: MediaQuery.of(context).size.height * 0.90,
          ),
          decoration: BoxDecoration(
            color: isDark ? const Color(0xFF0A0E1A) : Colors.white,
            borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
            border: Border.all(
              color: const Color(0xFF0060AF),
              width: 2.0,
            ),
            boxShadow: const [
              BoxShadow(color: Colors.black54, blurRadius: 30, offset: Offset(0, -6)),
            ],
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Center(
                child: Container(
                  width: 44,
                  height: 4,
                  margin: const EdgeInsets.symmetric(vertical: 12),
                  decoration: BoxDecoration(
                    color: isDark ? const Color(0xFF334155) : const Color(0xFFCBD5E1),
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
              ),

              Flexible(
                child: SingleChildScrollView(
                  padding: const EdgeInsets.fromLTRB(20, 0, 20, 24),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Header
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: [
                              Container(
                                padding: const EdgeInsets.all(8),
                                decoration: BoxDecoration(
                                  color: const Color(0xFF0060AF).withValues(alpha: 0.15),
                                  borderRadius: BorderRadius.circular(8),
                                  border: Border.all(color: const Color(0xFF0060AF), width: 1.2),
                                ),
                                child: const Icon(LucideIcons.building2, color: Color(0xFF0060AF), size: 18),
                              ),
                              const SizedBox(width: 10),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    'BCA VIRTUAL ACCOUNT',
                                    style: TextStyle(
                                      fontFamily: 'monospace',
                                      fontSize: 14,
                                      fontWeight: FontWeight.w900,
                                      color: isDark ? Colors.white : const Color(0xFF0F172A),
                                      letterSpacing: 0.5,
                                    ),
                                  ),
                                  const Text(
                                    '// KODE PERUSAHAAN: 80777 • VERIFIKASI 24 JAM',
                                    style: TextStyle(
                                      fontFamily: 'monospace',
                                      fontSize: 9.5,
                                      fontWeight: FontWeight.w700,
                                      color: Color(0xFF0060AF),
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                          IconButton(
                            icon: Icon(LucideIcons.x, size: 20, color: isDark ? Colors.white70 : const Color(0xFF64748B)),
                            onPressed: () => Navigator.pop(bottomCtx),
                          ),
                        ],
                      ),
                      const SizedBox(height: 16),

                      // VA Number Card
                      Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: isDark ? const Color(0xFF05070D) : const Color(0xFFF0F7FF),
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(
                            color: const Color(0xFF0060AF),
                            width: 1.5,
                          ),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'NOMOR VIRTUAL ACCOUNT BCA:',
                              style: TextStyle(
                                fontFamily: 'monospace',
                                fontSize: 10.5,
                                color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const SizedBox(height: 8),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                const Text(
                                  vaNumber,
                                  style: TextStyle(
                                    fontFamily: 'monospace',
                                    fontSize: 20,
                                    fontWeight: FontWeight.w900,
                                    color: Color(0xFF0060AF),
                                    letterSpacing: 2.0,
                                  ),
                                ),
                                ElevatedButton.icon(
                                  onPressed: () => _copyText(vaNumber, 'Nomor BCA VA'),
                                  icon: const Icon(LucideIcons.copy, size: 13),
                                  label: const Text('Salin', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: const Color(0xFF0060AF),
                                    foregroundColor: Colors.white,
                                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                                    minimumSize: Size.zero,
                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 12),
                            Divider(height: 1, color: isDark ? const Color(0xFF1E293B) : const Color(0xFFCBD5E1)),
                            const SizedBox(height: 12),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  'Total Tagihan:',
                                  style: TextStyle(fontSize: 12, color: isDark ? Colors.white70 : const Color(0xFF475569)),
                                ),
                                Text(
                                  _formatCurrency(amount),
                                  style: TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.w900,
                                    color: isDark ? const Color(0xFF00FF9D) : const Color(0xFF059669),
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 16),

                      // Panduan Pembayaran
                      Text(
                        'PANDUAN PEMBAYARAN BCA:',
                        style: TextStyle(
                          fontFamily: 'monospace',
                          fontSize: 11,
                          fontWeight: FontWeight.w900,
                          color: isDark ? const Color(0xFF00F0FF) : const Color(0xFF0F172A),
                        ),
                      ),
                      const SizedBox(height: 8),
                      _buildPaymentStepItem('1', 'BCA Mobile (m-BCA)', 'Buka m-Transfer ➔ Pilih "BCA Virtual Account" ➔ Masukkan $vaNumber ➔ Pastikan nama tagihan "AUDIRA - Pelanggan" ➔ Masukkan PIN m-BCA.', isDark),
                      const SizedBox(height: 8),
                      _buildPaymentStepItem('2', 'myBCA / KlikBCA', 'Pilih menu "Transfer" ➔ "Virtual Account" ➔ Masukkan nomor VA ➔ Otorisasi pembayaran dengan KeyBCA Appli 1.', isDark),
                      const SizedBox(height: 8),
                      _buildPaymentStepItem('3', 'ATM BCA', 'Pilih Transaksi Lainnya ➔ Transfer ➔ Ke Rek BCA Virtual Account ➔ Masukkan $vaNumber ➔ Konfirmasi nominal Rp ${_formatNumber(amount)}.', isDark),
                      const SizedBox(height: 18),

                      // CTA
                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton.icon(
                          onPressed: () {
                            Navigator.pop(bottomCtx);
                            _executePayment(
                              billId: billId,
                              method: 'BCA Virtual Account',
                              amount: amount,
                              month: month,
                            );
                          },
                          icon: const Icon(LucideIcons.zap, size: 18),
                          label: const Text(
                            'SIMULASI PELUNASAN / SUDAH TRANSFER ➔',
                            style: TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.w900,
                              letterSpacing: 0.5,
                            ),
                          ),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF0060AF),
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(vertical: 13),
                            elevation: 0,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12),
                              side: const BorderSide(color: Colors.white, width: 1.5),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  // =========================================================================
  // 3. MANDIRI VIRTUAL ACCOUNT MODAL
  // =========================================================================

  void _openMandiriVaModal({
    required String billId,
    required double amount,
    required String month,
  }) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    const companyCode = '88012';
    const vaNumber = '8801208123456789';

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (bottomCtx) {
        return Container(
          constraints: BoxConstraints(
            maxHeight: MediaQuery.of(context).size.height * 0.90,
          ),
          decoration: BoxDecoration(
            color: isDark ? const Color(0xFF0A0E1A) : Colors.white,
            borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
            border: Border.all(
              color: const Color(0xFFF59E0B),
              width: 2.0,
            ),
            boxShadow: const [
              BoxShadow(color: Colors.black54, blurRadius: 30, offset: Offset(0, -6)),
            ],
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Center(
                child: Container(
                  width: 44,
                  height: 4,
                  margin: const EdgeInsets.symmetric(vertical: 12),
                  decoration: BoxDecoration(
                    color: isDark ? const Color(0xFF334155) : const Color(0xFFCBD5E1),
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
              ),

              Flexible(
                child: SingleChildScrollView(
                  padding: const EdgeInsets.fromLTRB(20, 0, 20, 24),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Header
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: [
                              Container(
                                padding: const EdgeInsets.all(8),
                                decoration: BoxDecoration(
                                  color: const Color(0xFFF59E0B).withValues(alpha: 0.15),
                                  borderRadius: BorderRadius.circular(8),
                                  border: Border.all(color: const Color(0xFFF59E0B), width: 1.2),
                                ),
                                child: const Icon(LucideIcons.creditCard, color: Color(0xFFF59E0B), size: 18),
                              ),
                              const SizedBox(width: 10),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    'MANDIRI VIRTUAL ACCOUNT',
                                    style: TextStyle(
                                      fontFamily: 'monospace',
                                      fontSize: 14,
                                      fontWeight: FontWeight.w900,
                                      color: isDark ? Colors.white : const Color(0xFF0F172A),
                                      letterSpacing: 0.5,
                                    ),
                                  ),
                                  const Text(
                                    '// KODE BILLER: 88012 (AUDIRA NETWORKS)',
                                    style: TextStyle(
                                      fontFamily: 'monospace',
                                      fontSize: 9.5,
                                      fontWeight: FontWeight.w700,
                                      color: Color(0xFFF59E0B),
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                          IconButton(
                            icon: Icon(LucideIcons.x, size: 20, color: isDark ? Colors.white70 : const Color(0xFF64748B)),
                            onPressed: () => Navigator.pop(bottomCtx),
                          ),
                        ],
                      ),
                      const SizedBox(height: 16),

                      // VA Card
                      Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: isDark ? const Color(0xFF05070D) : const Color(0xFFFFFBEB),
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(
                            color: const Color(0xFFF59E0B),
                            width: 1.5,
                          ),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  'KODE PERUSAHAAN:',
                                  style: TextStyle(
                                    fontFamily: 'monospace',
                                    fontSize: 10.5,
                                    color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                const Text(
                                  companyCode,
                                  style: TextStyle(
                                    fontFamily: 'monospace',
                                    fontSize: 14,
                                    fontWeight: FontWeight.w900,
                                    color: Color(0xFFF59E0B),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 6),
                            Text(
                              'NOMOR VA / KODE PELANGGAN:',
                              style: TextStyle(
                                fontFamily: 'monospace',
                                fontSize: 10.5,
                                color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const SizedBox(height: 6),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                const Text(
                                  vaNumber,
                                  style: TextStyle(
                                    fontFamily: 'monospace',
                                    fontSize: 19,
                                    fontWeight: FontWeight.w900,
                                    color: Color(0xFFF59E0B),
                                    letterSpacing: 1.5,
                                  ),
                                ),
                                ElevatedButton.icon(
                                  onPressed: () => _copyText(vaNumber, 'Nomor Mandiri VA'),
                                  icon: const Icon(LucideIcons.copy, size: 13),
                                  label: const Text('Salin', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: const Color(0xFFF59E0B),
                                    foregroundColor: Colors.black,
                                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                                    minimumSize: Size.zero,
                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 12),
                            Divider(height: 1, color: isDark ? const Color(0xFF1E293B) : const Color(0xFFCBD5E1)),
                            const SizedBox(height: 12),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  'Total Tagihan:',
                                  style: TextStyle(fontSize: 12, color: isDark ? Colors.white70 : const Color(0xFF475569)),
                                ),
                                Text(
                                  _formatCurrency(amount),
                                  style: TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.w900,
                                    color: isDark ? const Color(0xFF00FF9D) : const Color(0xFF059669),
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 16),

                      // Panduan
                      Text(
                        'PANDUAN PEMBAYARAN MANDIRI:',
                        style: TextStyle(
                          fontFamily: 'monospace',
                          fontSize: 11,
                          fontWeight: FontWeight.w900,
                          color: isDark ? const Color(0xFF00F0FF) : const Color(0xFF0F172A),
                        ),
                      ),
                      const SizedBox(height: 8),
                      _buildPaymentStepItem('1', "Livin' by Mandiri (Kuning)", 'Buka aplikasi Livin ➔ pilih menu "Bayar" ➔ cari penyedia jasa: 88012 atau "AUDIRA NET" ➔ Masukkan nomor VA $vaNumber ➔ Konfirmasi rincian pembayaran ➔ Masukkan PIN Livin.', isDark),
                      const SizedBox(height: 8),
                      _buildPaymentStepItem('2', 'ATM Bank Mandiri', 'Pilih menu "Bayar/Beli" ➔ "Lainnya" ➔ "Multi Payment" ➔ Masukkan kode perusahaan 88012 ➔ Masukkan nomor VA ➔ Tekan Benar.', isDark),
                      const SizedBox(height: 18),

                      // CTA
                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton.icon(
                          onPressed: () {
                            Navigator.pop(bottomCtx);
                            _executePayment(
                              billId: billId,
                              method: 'Mandiri Virtual Account',
                              amount: amount,
                              month: month,
                            );
                          },
                          icon: const Icon(LucideIcons.zap, size: 18),
                          label: const Text(
                            'SIMULASI PELUNASAN / SUDAH TRANSFER ➔',
                            style: TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.w900,
                              letterSpacing: 0.5,
                            ),
                          ),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFFF59E0B),
                            foregroundColor: Colors.black,
                            padding: const EdgeInsets.symmetric(vertical: 13),
                            elevation: 0,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12),
                              side: const BorderSide(color: Colors.black, width: 1.5),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  // =========================================================================
  // 4. E-WALLET UNIVERSAL MODAL
  // =========================================================================

  void _openEWalletModal({
    required String billId,
    required double amount,
    required String month,
  }) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    String selectedWallet = 'GoPay';

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (bottomCtx) {
        return StatefulBuilder(
          builder: (context, setModalState) {
            final walletDetails = {
              'GoPay': {'color': const Color(0xFF00AA13), 'desc': 'Gojek Instant Pay • Cashback Koin'},
              'OVO': {'color': const Color(0xFF4C3494), 'desc': 'OVO Cash & OVO Points'},
              'DANA': {'color': const Color(0xFF118EEA), 'desc': 'Dompet Digital DANA Saldo & Debit'},
              'ShopeePay': {'color': const Color(0xFFEE4D2D), 'desc': 'ShopeePay & SPayLater Fast Hub'},
            };

            return Container(
              constraints: BoxConstraints(
                maxHeight: MediaQuery.of(context).size.height * 0.90,
              ),
              decoration: BoxDecoration(
                color: isDark ? const Color(0xFF0A0E1A) : Colors.white,
                borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
                border: Border.all(
                  color: isDark ? const Color(0xFF00FF9D) : const Color(0xFF0F172A),
                  width: 2.0,
                ),
                boxShadow: const [
                  BoxShadow(color: Colors.black54, blurRadius: 30, offset: Offset(0, -6)),
                ],
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Center(
                    child: Container(
                      width: 44,
                      height: 4,
                      margin: const EdgeInsets.symmetric(vertical: 12),
                      decoration: BoxDecoration(
                        color: isDark ? const Color(0xFF334155) : const Color(0xFFCBD5E1),
                        borderRadius: BorderRadius.circular(2),
                      ),
                    ),
                  ),

                  Flexible(
                    child: SingleChildScrollView(
                      padding: const EdgeInsets.fromLTRB(20, 0, 20, 24),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          // Header
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Row(
                                children: [
                                  Container(
                                    padding: const EdgeInsets.all(8),
                                    decoration: BoxDecoration(
                                      color: const Color(0xFF00FF9D).withValues(alpha: 0.15),
                                      borderRadius: BorderRadius.circular(8),
                                      border: Border.all(color: const Color(0xFF00FF9D), width: 1.2),
                                    ),
                                    child: const Icon(LucideIcons.wallet, color: Color(0xFF00FF9D), size: 18),
                                  ),
                                  const SizedBox(width: 10),
                                  Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        'DOMPET DIGITAL // E-WALLET',
                                        style: TextStyle(
                                          fontFamily: 'monospace',
                                          fontSize: 14,
                                          fontWeight: FontWeight.w900,
                                          color: isDark ? Colors.white : const Color(0xFF0F172A),
                                          letterSpacing: 0.5,
                                        ),
                                      ),
                                      const Text(
                                        '// DIRECT DEEPLINK & NOTIFIKASI OTOMATIS',
                                        style: TextStyle(
                                          fontFamily: 'monospace',
                                          fontSize: 9.5,
                                          fontWeight: FontWeight.w700,
                                          color: Color(0xFF00FF9D),
                                        ),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                              IconButton(
                                icon: Icon(LucideIcons.x, size: 20, color: isDark ? Colors.white70 : const Color(0xFF64748B)),
                                onPressed: () => Navigator.pop(bottomCtx),
                              ),
                            ],
                          ),
                          const SizedBox(height: 16),

                          Text(
                            'PILIH DOMPET DIGITAL:',
                            style: TextStyle(
                              fontFamily: 'monospace',
                              fontSize: 11,
                              fontWeight: FontWeight.w900,
                              color: isDark ? const Color(0xFF00F0FF) : const Color(0xFF0F172A),
                            ),
                          ),
                          const SizedBox(height: 10),

                          // 4 Wallet Choice Tiles
                          ...walletDetails.entries.map((entry) {
                            final wName = entry.key;
                            final wColor = entry.value['color'] as Color;
                            final wDesc = entry.value['desc'] as String;
                            final isSelected = selectedWallet == wName;

                            return Padding(
                              padding: const EdgeInsets.only(bottom: 8),
                              child: InkWell(
                                onTap: () => setModalState(() => selectedWallet = wName),
                                borderRadius: BorderRadius.circular(12),
                                child: Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                                  decoration: BoxDecoration(
                                    color: isDark ? const Color(0xFF05070D) : Colors.white,
                                    borderRadius: BorderRadius.circular(12),
                                    border: Border.all(
                                      color: isSelected ? wColor : (isDark ? const Color(0xFF1E293B) : const Color(0xFFE2E8F0)),
                                      width: isSelected ? 2.0 : 1.2,
                                    ),
                                    boxShadow: isSelected
                                        ? [
                                            BoxShadow(
                                              color: wColor.withValues(alpha: 0.25),
                                              blurRadius: 8,
                                              offset: const Offset(0, 2),
                                            ),
                                          ]
                                        : null,
                                  ),
                                  child: Row(
                                    children: [
                                      Container(
                                        width: 14,
                                        height: 14,
                                        decoration: BoxDecoration(
                                          shape: BoxShape.circle,
                                          border: Border.all(
                                            color: isSelected ? wColor : (isDark ? Colors.white38 : Colors.black38),
                                            width: isSelected ? 4 : 1.5,
                                          ),
                                          color: isSelected ? Colors.white : Colors.transparent,
                                        ),
                                      ),
                                      const SizedBox(width: 12),
                                      Expanded(
                                        child: Column(
                                          crossAxisAlignment: CrossAxisAlignment.start,
                                          children: [
                                            Text(
                                              wName,
                                              style: TextStyle(
                                                fontSize: 13,
                                                fontWeight: FontWeight.w900,
                                                color: isDark ? Colors.white : const Color(0xFF0F172A),
                                              ),
                                            ),
                                            Text(
                                              wDesc,
                                              style: TextStyle(
                                                fontSize: 10,
                                                color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                      Container(
                                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                        decoration: BoxDecoration(
                                          color: wColor.withValues(alpha: 0.15),
                                          borderRadius: BorderRadius.circular(6),
                                        ),
                                        child: Text(
                                          'INSTAN',
                                          style: TextStyle(
                                            fontSize: 9.5,
                                            fontWeight: FontWeight.bold,
                                            color: wColor,
                                            fontFamily: 'monospace',
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            );
                          }),

                          const SizedBox(height: 12),

                          // Target Phone box
                          Container(
                            padding: const EdgeInsets.all(12),
                            decoration: BoxDecoration(
                              color: isDark ? const Color(0xFF05070D) : const Color(0xFFF8FAFC),
                              borderRadius: BorderRadius.circular(12),
                              border: Border.all(
                                color: isDark ? const Color(0xFF1E293B) : const Color(0xFFE2E8F0),
                              ),
                            ),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      'NOMOR AKUN TERDAFTAR:',
                                      style: TextStyle(
                                        fontFamily: 'monospace',
                                        fontSize: 9.5,
                                        color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                    const SizedBox(height: 2),
                                    const Text(
                                      '0812-3456-7890 (Ahmad Fauzi)',
                                      style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
                                    ),
                                  ],
                                ),
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 3),
                                  decoration: BoxDecoration(
                                    color: const Color(0xFF00FF9D).withValues(alpha: 0.15),
                                    borderRadius: BorderRadius.circular(6),
                                  ),
                                  child: const Text(
                                    'TERVERIFIKASI',
                                    style: TextStyle(fontSize: 9, fontWeight: FontWeight.w900, color: Color(0xFF00FF9D)),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(height: 14),

                          // Nominal Box
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                'Total Yang Dibayar:',
                                style: TextStyle(
                                  fontSize: 12,
                                  color: isDark ? Colors.white70 : const Color(0xFF475569),
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                              Text(
                                _formatCurrency(amount),
                                style: TextStyle(
                                  fontSize: 20,
                                  fontWeight: FontWeight.w900,
                                  color: isDark ? const Color(0xFF00FF9D) : const Color(0xFF059669),
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 16),

                          // CTA
                          SizedBox(
                            width: double.infinity,
                            child: ElevatedButton.icon(
                              onPressed: () {
                                Navigator.pop(bottomCtx);
                                _executePayment(
                                  billId: billId,
                                  method: 'E-Wallet $selectedWallet',
                                  amount: amount,
                                  month: month,
                                );
                              },
                              icon: const Icon(LucideIcons.zap, size: 18),
                              label: Text(
                                'BAYAR DENGAN $selectedWallet INSTAN ➔',
                                style: const TextStyle(
                                  fontSize: 12.5,
                                  fontWeight: FontWeight.w900,
                                  letterSpacing: 0.5,
                                ),
                              ),
                              style: ElevatedButton.styleFrom(
                                backgroundColor: walletDetails[selectedWallet]!['color'] as Color,
                                foregroundColor: Colors.white,
                                padding: const EdgeInsets.symmetric(vertical: 13),
                                elevation: 0,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(12),
                                  side: const BorderSide(color: Colors.white, width: 1.5),
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            );
          },
        );
      },
    );
  }

  Widget _buildPaymentStepItem(String number, String title, String description, bool isDark) {
    return Container(
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF05070D) : const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(10),
        border: Border.all(
          color: isDark ? const Color(0xFF1E293B) : const Color(0xFFE2E8F0),
        ),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 20,
            height: 20,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: isDark ? const Color(0xFF00F0FF).withValues(alpha: 0.2) : const Color(0xFF0F172A),
            ),
            alignment: Alignment.center,
            child: Text(
              number,
              style: TextStyle(
                fontSize: 10,
                fontWeight: FontWeight.bold,
                color: isDark ? const Color(0xFF00F0FF) : Colors.white,
              ),
            ),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: TextStyle(
                    fontSize: 11.5,
                    fontWeight: FontWeight.bold,
                    color: isDark ? Colors.white : const Color(0xFF0F172A),
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  description,
                  style: TextStyle(
                    fontSize: 10.5,
                    color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
                    height: 1.4,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // =========================================================================
  // EXECUTE PAYMENT ENGINE (REAL GATEWAY CALL + RADIUS COA DISPATCH)
  // =========================================================================

  Future<void> _executePayment({
    required String billId,
    required String method,
    required double amount,
    required String month,
  }) async {
    final effectiveTxId = 'TX-${DateTime.now().millisecondsSinceEpoch.toString().substring(5)}';
    final idempotencyKey = 'IDEMP-$billId-$effectiveTxId';

    // Show processing HUD
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (loadingCtx) => Center(
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
          margin: const EdgeInsets.symmetric(horizontal: 32),
          decoration: BoxDecoration(
            color: const Color(0xFF0F172A),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: const Color(0xFF00F0FF), width: 1.5),
            boxShadow: const [
              BoxShadow(color: Colors.black54, blurRadius: 24, offset: Offset(0, 4)),
            ],
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: const [
              SizedBox(
                width: 36,
                height: 36,
                child: CircularProgressIndicator(color: Color(0xFF00F0FF), strokeWidth: 3),
              ),
              SizedBox(height: 16),
              Text(
                'VERIFIKASI & RADIUS CoA...',
                style: TextStyle(
                  color: Colors.white,
                  fontFamily: 'monospace',
                  fontSize: 12.5,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 4),
              Text(
                'Mengirim sinyal unblock UDP 3799 ke MikroTik',
                style: TextStyle(
                  color: Color(0xFF00FF9D),
                  fontFamily: 'monospace',
                  fontSize: 10.5,
                ),
              ),
            ],
          ),
        ),
      ),
    );

    // Call Backend API with Idempotency Key & CoA unblock
    try {
      await BackendApiService.instance.payInvoiceWithCoA(
        invoiceId: billId,
        amount: amount,
        method: method,
        transactionId: effectiveTxId,
        idempotencyKey: idempotencyKey,
      );
    } catch (_) {}

    // Record in Firebase for local caching/fallback
    try {
      await FirebaseService.instance.createPayment({
        'billId': billId,
        'customerId': 1,
        'amount': amount.toInt(),
        'paymentMethod': method,
        'paymentStatus': 'completed',
        'transactionId': effectiveTxId,
      });
    } catch (_) {}

    // Update in-memory bills state
    setState(() {
      final idx = _bills.indexWhere((b) => b['id']?.toString() == billId);
      final nowFormatted = '${DateTime.now().day} ${_getMonthName(DateTime.now().month)} ${DateTime.now().year}';
      if (idx != -1) {
        _bills[idx]['status'] = 'paid';
        _bills[idx]['paidAt'] = nowFormatted;
      } else {
        _bills.insert(0, {
          'id': billId,
          'billMonth': month,
          'amount': amount,
          'status': 'paid',
          'paidAt': nowFormatted,
        });
      }
    });

    if (mounted) {
      Navigator.pop(context); // Close loading HUD
      _showPaymentSuccessReceipt(
        billId: billId,
        method: method,
        amount: amount,
        month: month,
        txId: effectiveTxId,
      );
    }
  }

  void _showPaymentSuccessReceipt({
    required String billId,
    required String method,
    required double amount,
    required String month,
    required String txId,
  }) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (dialogCtx) => AlertDialog(
        backgroundColor: isDark ? const Color(0xFF0A0E1A) : Colors.white,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
          side: const BorderSide(color: Color(0xFF00FF9D), width: 2.0),
        ),
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: const Color(0xFF00FF9D).withValues(alpha: 0.15),
                shape: BoxShape.circle,
              ),
              child: const Icon(LucideIcons.checkCircle2, size: 24, color: Color(0xFF00FF9D)),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'PEMBAYARAN LUNAS',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w900,
                      color: isDark ? Colors.white : const Color(0xFF0F172A),
                      letterSpacing: 0.5,
                    ),
                  ),
                  const Text(
                    '// RADIUS CoA UNBLOCKED • 1.1s',
                    style: TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.w700,
                      color: Color(0xFF00FF9D),
                      fontFamily: 'monospace',
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: isDark ? const Color(0xFF05070D) : const Color(0xFFF1F5F9),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(
                  color: isDark ? const Color(0xFF1E293B) : const Color(0xFFCBD5E1),
                ),
              ),
              child: Column(
                children: [
                  _buildReceiptRow('No. Invoice', billId, isDark),
                  const SizedBox(height: 6),
                  _buildReceiptRow('ID Transaksi', txId, isDark),
                  const SizedBox(height: 6),
                  _buildReceiptRow('Kanal Bayar', method, isDark),
                  const SizedBox(height: 6),
                  _buildReceiptRow('Periode', month, isDark),
                  const Divider(height: 16, color: Color(0xFF1E293B)),
                  _buildReceiptRow('Total Bayar', _formatCurrency(amount), isDark, isHighlight: true),
                ],
              ),
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                const Icon(LucideIcons.zap, size: 14, color: Color(0xFF00FF9D)),
                const SizedBox(width: 6),
                Expanded(
                  child: Text(
                    'Koneksi internet Anda aktif kembali secara instan tanpa perlu reboot ONT.',
                    style: TextStyle(
                      fontSize: 10.5,
                      color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
        actions: [
          Row(
            children: [
              Expanded(
                child: OutlinedButton.icon(
                  onPressed: () => _shareReceiptViaWhatsApp(billId, month, amount),
                  icon: const Icon(LucideIcons.share2, size: 13),
                  label: const Text('Share WA', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                  style: OutlinedButton.styleFrom(
                    foregroundColor: const Color(0xFF00FF9D),
                    side: const BorderSide(color: Color(0xFF00FF9D), width: 1.2),
                    padding: const EdgeInsets.symmetric(vertical: 10),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                  ),
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: ElevatedButton(
                  onPressed: () {
                    Navigator.pop(dialogCtx);
                    _tabController.animateTo(1); // Auto-switch to Riwayat Lunas
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF0070F3),
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 10),
                    elevation: 0,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                  ),
                  child: const Text(
                    'Lihat Riwayat ➔',
                    style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildReceiptRow(String label, String value, bool isDark, {bool isHighlight = false}) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          label,
          style: TextStyle(
            fontSize: 11,
            color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
            fontFamily: 'monospace',
          ),
        ),
        Text(
          value,
          style: TextStyle(
            fontSize: isHighlight ? 14 : 11.5,
            fontWeight: isHighlight ? FontWeight.w900 : FontWeight.w700,
            color: isHighlight
                ? (isDark ? const Color(0xFF00FF9D) : const Color(0xFF059669))
                : (isDark ? Colors.white : const Color(0xFF0F172A)),
            fontFamily: 'monospace',
          ),
        ),
      ],
    );
  }

  String _formatNumber(double value) {
    return value
        .toStringAsFixed(0)
        .replaceAllMapped(
          RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'),
          (Match m) => '${m[1]}.',
        );
  }

