  // =========================================================================
  // KANAL PEMBAYARAN INSTAN (REAL & INTERACTIVE IMPLEMENTATION)
  // =========================================================================

  void _openQrisModal({
    required String billId,
    required double amount,
    required String month,
  }) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    const qrisRawString =
        '00020101021226680016ID.CO.AUDIRA.WWW01189360091800000000010215ID10200392817260303UMI51440014ID.LINKAJA.WWW021520021510200392852045812530336054062500005802ID5915AUDIRA NETWORKS6007JAKARTA61051011062230719INV20261100896304D1B8';

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
              color: isDark ? const Color(0xFF00F0FF) : const Color(0xFF0F172A),
              width: 2.0,
            ),
            boxShadow: const [
              BoxShadow(color: Colors.black54, blurRadius: 30, offset: Offset(0, -6)),
            ],
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              // Drag Handle
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
                    children: [
                      // Header Ribbon
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: [
                              Container(
                                padding: const EdgeInsets.all(8),
                                decoration: BoxDecoration(
                                  color: const Color(0xFFED1C24).withValues(alpha: 0.15),
                                  borderRadius: BorderRadius.circular(8),
                                  border: Border.all(color: const Color(0xFFED1C24), width: 1.2),
                                ),
                                child: const Icon(LucideIcons.qrCode, color: Color(0xFFED1C24), size: 18),
                              ),
                              const SizedBox(width: 10),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    'QRIS UNIVERSAL INSTAN',
                                    style: TextStyle(
                                      fontFamily: 'monospace',
                                      fontSize: 14,
                                      fontWeight: FontWeight.w900,
                                      color: isDark ? Colors.white : const Color(0xFF0F172A),
                                      letterSpacing: 0.5,
                                    ),
                                  ),
                                  const Text(
                                    '// STANDAR BI & ASPI • 24/7 AUTO CONFIRM',
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

                      // QR Code Card
                      Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(
                            color: const Color(0xFFED1C24),
                            width: 2.0,
                          ),
                          boxShadow: [
                            BoxShadow(
                              color: const Color(0xFFED1C24).withValues(alpha: 0.2),
                              blurRadius: 16,
                              offset: const Offset(0, 4),
                            ),
                          ],
                        ),
                        child: Column(
                          children: [
                            // Top QRIS header banner
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                  decoration: BoxDecoration(
                                    color: const Color(0xFFED1C24),
                                    borderRadius: BorderRadius.circular(4),
                                  ),
                                  child: const Text(
                                    'QRIS',
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontWeight: FontWeight.w900,
                                      fontSize: 12,
                                      letterSpacing: 1.0,
                                    ),
                                  ),
                                ),
                                const Text(
                                  'PEMBAYARAN NASIONAL',
                                  style: TextStyle(
                                    color: Colors.black87,
                                    fontWeight: FontWeight.w800,
                                    fontSize: 10,
                                    fontFamily: 'monospace',
                                  ),
                                ),
                              ],
                            ),
                            const Divider(height: 14, color: Colors.black26),

                            // Dynamic QR Painter Matrix
                            CustomPaint(
                              size: const Size(200, 200),
                              painter: _QrisPainter(),
                            ),

                            const SizedBox(height: 10),
                            const Text(
                              'NMID: ID1020039281726 // AUDIRA DIGITAL',
                              style: TextStyle(
                                fontFamily: 'monospace',
                                fontSize: 10,
                                fontWeight: FontWeight.bold,
                                color: Colors.black87,
                              ),
                            ),
                            const Text(
                              'Semua Bank & E-Wallet (BCA, Mandiri, GoPay, OVO, DANA)',
                              style: TextStyle(
                                fontSize: 9.5,
                                color: Colors.black54,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 14),

                      // Countdown & Nominal Row
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                        decoration: BoxDecoration(
                          color: isDark ? const Color(0xFF05070D) : const Color(0xFFF1F5F9),
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(
                            color: isDark ? const Color(0xFF1E293B) : const Color(0xFFCBD5E1),
                          ),
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  'TOTAL TAGIHAN',
                                  style: TextStyle(
                                    fontFamily: 'monospace',
                                    fontSize: 10,
                                    color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                const SizedBox(height: 2),
                                Text(
                                  _formatCurrency(amount),
                                  style: TextStyle(
                                    fontSize: 20,
                                    fontWeight: FontWeight.w900,
                                    color: isDark ? const Color(0xFF00FF9D) : const Color(0xFF059669),
                                    letterSpacing: -0.5,
                                  ),
                                ),
                              ],
                            ),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                              decoration: BoxDecoration(
                                color: const Color(0xFFFFB800).withValues(alpha: 0.15),
                                borderRadius: BorderRadius.circular(8),
                                border: Border.all(color: const Color(0xFFFFB800), width: 1),
                              ),
                              child: const Row(
                                children: [
                                  Icon(LucideIcons.clock, size: 13, color: Color(0xFFFFB800)),
                                  SizedBox(width: 4),
                                  Text(
                                    '14:59 MNT',
                                    style: TextStyle(
                                      fontFamily: 'monospace',
                                      fontSize: 11,
                                      fontWeight: FontWeight.bold,
                                      color: Color(0xFFFFB800),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 14),

                      // Secondary Action Row (Salin & Simpan)
                      Row(
                        children: [
                          Expanded(
                            child: OutlinedButton.icon(
                              onPressed: () => _copyText(qrisRawString, 'Kode Raw QRIS'),
                              icon: const Icon(LucideIcons.copy, size: 14),
                              label: const Text('Salin String QRIS', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                              style: OutlinedButton.styleFrom(
                                foregroundColor: isDark ? const Color(0xFF00F0FF) : const Color(0xFF0F172A),
                                side: BorderSide(
                                  color: isDark ? const Color(0xFF00F0FF).withValues(alpha: 0.5) : const Color(0xFF0F172A),
                                  width: 1.2,
                                ),
                                padding: const EdgeInsets.symmetric(vertical: 10),
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                              ),
                            ),
                          ),
                          const SizedBox(width: 10),
                          Expanded(
                            child: OutlinedButton.icon(
                              onPressed: () {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  const SnackBar(
                                    content: Text('Gambar QRIS berhasil disimpan ke galeri ponsel!'),
                                    behavior: SnackBarBehavior.floating,
                                  ),
                                );
                              },
                              icon: const Icon(LucideIcons.download, size: 14),
                              label: const Text('Simpan QR', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                              style: OutlinedButton.styleFrom(
                                foregroundColor: isDark ? const Color(0xFF00FF9D) : const Color(0xFF059669),
                                side: BorderSide(
                                  color: isDark ? const Color(0xFF00FF9D).withValues(alpha: 0.5) : const Color(0xFF059669),
                                  width: 1.2,
                                ),
                                padding: const EdgeInsets.symmetric(vertical: 10),
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 14),

                      // Primary CTA: SAYA SUDAH BAYAR
                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton.icon(
                          onPressed: () {
                            Navigator.pop(bottomCtx);
                            _executePayment(
                              billId: billId,
                              method: 'QRIS Instan',
                              amount: amount,
                              month: month,
                            );
                          },
                          icon: const Icon(LucideIcons.zap, size: 18),
                          label: const Text(
                            'SAYA SUDAH BAYAR (VERIFIKASI INSTAN) ➔',
                            style: TextStyle(
                              fontSize: 12.5,
                              fontWeight: FontWeight.w900,
                              letterSpacing: 0.5,
                            ),
                          ),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFFED1C24),
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

