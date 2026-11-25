import React, { useEffect, useState } from 'react';
import { Check, ChevronDown, ChevronUp, Copy, Info } from 'lucide-react';
import { BackArrowIcon } from './Icons';
import { BankMuamalatMethodIcon } from './PaymentMethodPage';
import { AddressData } from './CheckoutModals';

interface WaitingPaymentPageProps {
  totalOrderAmount: number;
  address: AddressData | null;
  onBack: () => void;
}

function formatRupiah(amount: number): string {
  return `Rp${amount.toLocaleString('id-ID')}`;
}

export function WaitingPaymentPage({
  totalOrderAmount,
  address,
  onBack,
}: WaitingPaymentPageProps) {
  const initialBill = 1000000;
  const remainingAmount = Math.max(0, totalOrderAmount - initialBill);

  const [secondsLeft, setSecondsLeft] = useState(24 * 3600 - 1);
  const [copiedRek, setCopiedRek] = useState(false);
  const [copiedNominal, setCopiedNominal] = useState(false);
  const [openGuide, setOpenGuide] = useState<'mbanking' | 'atm' | null>('mbanking');
  const [transferConfirmed, setTransferConfirmed] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  const countdownText = `${String(hours).padStart(2, '0')} jam ${String(minutes).padStart(
    2,
    '0'
  )} menit ${String(seconds).padStart(2, '0')} detik`;

  const handleCopy = async (value: string, type: 'rek' | 'nominal') => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Fallback ignored if clipboard permissions restricted
    }
    if (type === 'rek') {
      setCopiedRek(true);
      window.setTimeout(() => setCopiedRek(false), 2000);
    } else {
      setCopiedNominal(true);
      window.setTimeout(() => setCopiedNominal(false), 2000);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#EFEFEF] flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-[#F5F5F5] flex flex-col relative shadow-[0_0_24px_rgba(0,0,0,0.06)]">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-[52px] bg-white px-3.5 flex items-center gap-3.5 border-b border-[#F2F2F2]">
          <button
            type="button"
            onClick={onBack}
            className="w-8 h-8 -ml-1 flex items-center justify-center rounded-full active:bg-black/5 transition-colors"
            aria-label="Kembali ke Checkout"
          >
            <BackArrowIcon className="w-[22px] h-[22px]" />
          </button>
          <h1 className="text-[18px] font-normal text-[#222222] leading-none">
            Menunggu Pembayaran
          </h1>
        </header>

        <main className="flex-1 pb-[82px]">
          {/* Tagihan & Batas Waktu Card */}
          <section className="bg-white rounded-[10px] mx-2 mt-2.5 px-3.5 py-3.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[13px] text-[#555555]">Total Tagihan Saat Ini</span>
              <span className="flex items-center gap-2">
                <span className="text-[16px] font-semibold text-[#EE4D2D] tabular-nums">
                  Rp1.000.000
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy('1000000', 'nominal')}
                  className="text-[11px] font-medium text-[#26AA99] px-1.5 py-0.5 rounded-[3px] border border-[#26AA99] active:bg-[#F5FBFA]"
                >
                  {copiedNominal ? 'Tersalin' : 'Salin'}
                </button>
              </span>
            </div>

            <div className="mt-2.5 pt-2.5 border-t border-[#F2F2F2] flex items-center justify-between gap-2 text-[12.5px]">
              <span className="text-[#555555]">Bayar Dalam</span>
              <span className="text-[#EE4D2D] font-medium tabular-nums">{countdownText}</span>
            </div>
          </section>

          {/* Rekening Bank Muamalat Card */}
          <section className="bg-white rounded-[10px] mx-2 mt-2.5 px-3.5 py-3.5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#F2F2F2]">
              <BankMuamalatMethodIcon />
              <div>
                <p className="text-[14px] font-semibold text-[#222222]">BANK MUAMALAT</p>
                <p className="text-[11.5px] text-[#757575]">Transfer Bank</p>
              </div>
            </div>

            <div className="py-3 border-b border-[#F2F2F2]">
              <p className="text-[12px] text-[#757575]">Nomor Rekening</p>
              <div className="mt-1 flex items-center justify-between gap-2">
                <span className="text-[20px] font-semibold text-[#EE4D2D] tracking-[0.04em] tabular-nums">
                  4230021252
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy('4230021252', 'rek')}
                  className="inline-flex items-center gap-1 text-[12.5px] font-medium text-[#26AA99] px-2.5 py-1 rounded-[4px] border border-[#26AA99] active:bg-[#F5FBFA]"
                >
                  {copiedRek ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between text-[13px]">
              <span className="text-[#757575]">Nama Pemilik Rekening</span>
              <span className="font-semibold text-[#222222]">A/N JONINDO</span>
            </div>
          </section>

          {/* Informasi Tagihan & Sisa Pembayaran Card */}
          <section className="bg-white rounded-[10px] mx-2 mt-2.5 px-3.5 py-3.5">
            <div className="bg-[#FFF8F6] border border-[#F49D8E] rounded-[8px] p-3 flex items-start gap-2.5">
              <Info className="w-[17px] h-[17px] text-[#EE4D2D] shrink-0 mt-0.5" />
              <div className="text-[12.5px] leading-[1.45] text-[#333333]">
                <p className="font-semibold text-[#EE4D2D] mb-0.5">Informasi Tagihan</p>
                <p>
                  Tagihan yang dibayarkan senilai <span className="font-semibold text-[#222222]">Rp1.000.000</span>.
                  Sisa kekurangan pembayaran dibayar apabila barang sudah sampai di alamat tujuan.
                </p>
              </div>
            </div>

            <div className="mt-3 space-y-2 text-[12.5px]">
              <div className="flex items-center justify-between">
                <span className="text-[#555555]">Total Harga Pesanan</span>
                <span className="text-[#222222] tabular-nums">{formatRupiah(totalOrderAmount)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#555555]">Tagihan Dibayar Sekarang</span>
                <span className="text-[#EE4D2D] font-medium tabular-nums">
                  {formatRupiah(initialBill)}
                </span>
              </div>
              <div className="pt-2 border-t border-[#F2F2F2] flex items-center justify-between text-[13px] font-medium">
                <span className="text-[#222222]">Sisa Kekurangan (Bayar di Alamat)</span>
                <span className="text-[#222222] tabular-nums">{formatRupiah(remainingAmount)}</span>
              </div>
            </div>

            {address && (
              <div className="mt-3 pt-2.5 border-t border-[#F2F2F2] text-[12px] text-[#666666]">
                <p className="font-medium text-[#222222] mb-0.5">
                  Alamat Pengiriman: {address.name} ({address.phone})
                </p>
                <p>
                  {[address.line1, address.line2, address.line3].filter(Boolean).join(', ')}
                </p>
              </div>
            )}
          </section>

          {/* Petunjuk Transfer Card */}
          <section className="bg-white rounded-[10px] mx-2 mt-2.5 overflow-hidden">
            <div className="px-3.5 py-3 border-b border-[#F2F2F2]">
              <h2 className="text-[13.5px] font-medium text-[#222222]">Petunjuk Transfer</h2>
            </div>

            {/* Mobile Banking */}
            <div className="border-b border-[#F2F2F2]">
              <button
                type="button"
                onClick={() => setOpenGuide(openGuide === 'mbanking' ? null : 'mbanking')}
                className="w-full px-3.5 py-3 flex items-center justify-between text-left text-[13px] text-[#222222]"
              >
                <span>Transfer via Mobile Banking (Muamalat DIN / Bank Lain)</span>
                {openGuide === 'mbanking' ? (
                  <ChevronUp className="w-4 h-4 text-[#888888]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#888888]" />
                )}
              </button>
              {openGuide === 'mbanking' && (
                <ol className="px-3.5 pb-3.5 pl-7 space-y-1.5 text-[12px] text-[#555555] list-decimal leading-[1.45]">
                  <li>Buka aplikasi Mobile Banking Anda dan pilih menu Transfer ke Bank Muamalat.</li>
                  <li>
                    Masukkan nomor rekening <span className="font-semibold text-[#222222]">4230021252</span>{' '}
                    atas nama <span className="font-semibold text-[#222222]">JONINDO</span>.
                  </li>
                  <li>
                    Masukkan nominal tagihan sebesar{' '}
                    <span className="font-semibold text-[#EE4D2D]">Rp1.000.000</span>.
                  </li>
                  <li>Periksa rincian transaksi dan selesaikan pembayaran dengan PIN Anda.</li>
                </ol>
              )}
            </div>

            {/* ATM */}
            <div>
              <button
                type="button"
                onClick={() => setOpenGuide(openGuide === 'atm' ? null : 'atm')}
                className="w-full px-3.5 py-3 flex items-center justify-between text-left text-[13px] text-[#222222]"
              >
                <span>Transfer via ATM</span>
                {openGuide === 'atm' ? (
                  <ChevronUp className="w-4 h-4 text-[#888888]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#888888]" />
                )}
              </button>
              {openGuide === 'atm' && (
                <ol className="px-3.5 pb-3.5 pl-7 space-y-1.5 text-[12px] text-[#555555] list-decimal leading-[1.45]">
                  <li>Masukkan kartu ATM dan PIN Anda pada mesin ATM.</li>
                  <li>Pilih menu Transaksi Lainnya &gt; Transfer &gt; Rekening Bank Muamalat / Bank Lain (Kode 147).</li>
                  <li>
                    Masukkan nomor rekening <span className="font-semibold text-[#222222]">4230021252</span>{' '}
                    (A/N <span className="font-semibold text-[#222222]">JONINDO</span>).
                  </li>
                  <li>
                    Masukkan nominal <span className="font-semibold text-[#EE4D2D]">Rp1.000.000</span> dan konfirmasi transaksi.
                  </li>
                </ol>
              )}
            </div>
          </section>

          {transferConfirmed && (
            <div className="mx-2 mt-2.5 px-3.5 py-3 bg-[#E8F8F5] border border-[#26AA99] rounded-[10px] text-[12.5px] text-[#1D7A6E] flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>
                Konfirmasi transfer diterima. Pesanan akan segera diproses oleh JUAL MOTOR PRIBADI SDA.
              </span>
            </div>
          )}
        </main>

        {/* Bottom Sticky Action */}
        <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-[#EFEFEF] px-3.5 py-2.5 z-30 flex gap-2.5">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 h-[40px] border border-[#E0E0E0] text-[#555555] font-medium text-[13.5px] rounded-[6px]"
          >
            Kembali
          </button>
          <button
            type="button"
            onClick={() => setTransferConfirmed(true)}
            className="flex-1 h-[40px] bg-[#EE4D2D] hover:bg-[#DC3D1E] active:scale-[0.99] transition-all text-white font-medium text-[13.5px] rounded-[6px]"
          >
            {transferConfirmed ? 'Menunggu Verifikasi' : 'OK, Sudah Transfer'}
          </button>
        </footer>
      </div>
    </div>
  );
}
