import React, { useState } from 'react';
import { X, Check, ShieldCheck, Truck, Ticket, CreditCard } from 'lucide-react';

export type ActiveModal =
  | null
  | 'address'
  | 'protection_info'
  | 'store_voucher'
  | 'seller_note'
  | 'shipping_all'
  | 'platform_voucher'
  | 'payment_all'
  | 'spaylater'
  | 'service_fee'
  | 'terms'
  | 'order_success';

export interface AddressData {
  name: string;
  phone: string;
  line1: string;
  line2: string;
  line3: string;
}

interface CheckoutModalsProps {
  activeModal: ActiveModal;
  onClose: () => void;
  address: AddressData | null;
  onSaveAddress: (next: AddressData | null) => void;
  sellerNote: string;
  onSaveSellerNote: (note: string) => void;
  selectedShipping: 'hemat' | 'reguler';
  onSelectShipping: (ship: 'hemat' | 'reguler') => void;
  selectedPayment: 'cod' | 'spaylater' | 'transfer' | null;
  onSelectPayment: (method: 'cod' | 'spaylater' | 'transfer') => void;
  appliedStoreVoucher: string | null;
  onApplyStoreVoucher: (code: string | null) => void;
  appliedPlatformVoucher: boolean;
  onTogglePlatformVoucher: (active: boolean) => void;
  totalPaymentFormatted: string;
}

export function CheckoutModals({
  activeModal,
  onClose,
  address,
  onSaveAddress,
  sellerNote,
  onSaveSellerNote,
  selectedShipping,
  onSelectShipping,
  selectedPayment,
  onSelectPayment,
  appliedStoreVoucher,
  onApplyStoreVoucher,
  appliedPlatformVoucher,
  onTogglePlatformVoucher,
  totalPaymentFormatted,
}: CheckoutModalsProps) {
  const emptyAddress: AddressData = { name: '', phone: '', line1: '', line2: '', line3: '' };
  const [draftAddress, setDraftAddress] = useState<AddressData>(address ?? emptyAddress);
  const [draftNote, setDraftNote] = useState<string>(sellerNote);
  const [voucherCodeInput, setVoucherCodeInput] = useState<string>(appliedStoreVoucher ?? '');
  const [addressError, setAddressError] = useState<string | null>(null);

  React.useEffect(() => {
    if (activeModal === 'address') {
      setDraftAddress(address ?? { name: '', phone: '', line1: '', line2: '', line3: '' });
      setAddressError(null);
    }
  }, [activeModal, address]);

  if (!activeModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 transition-opacity"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-[430px] bg-white rounded-t-[14px] max-h-[82vh] flex flex-col overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {activeModal === 'address' && (
          <>
            <div className="px-4 py-3.5 border-b border-[#EFEFEF] flex items-center justify-between">
              <h2 className="text-[15px] font-medium text-[#222222]">
                {address ? 'Alamat Pengiriman' : 'Tambahkan Alamat'}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="p-1 text-[#757575] hover:text-[#222222]"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-3 overflow-y-auto text-[13px]">
              {addressError && (
                <div className="px-3 py-2 bg-[#FFF8F6] border border-[#F49D8E] rounded-[6px] text-[12px] text-[#EE4D2D]">
                  {addressError}
                </div>
              )}
              <div>
                <label className="block text-[12px] text-[#666666] mb-1">
                  Nama Penerima <span className="text-[#EE4D2D]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  value={draftAddress.name}
                  onChange={(e) => {
                    setAddressError(null);
                    setDraftAddress({ ...draftAddress, name: e.target.value });
                  }}
                  className="w-full border border-[#E0E0E0] rounded-[6px] px-3 py-2 text-[#222222] focus:outline-none focus:border-[#EE4D2D]"
                />
              </div>
              <div>
                <label className="block text-[12px] text-[#666666] mb-1">
                  Nomor Telepon <span className="text-[#EE4D2D]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: (+62) 812-3456-7890"
                  value={draftAddress.phone}
                  onChange={(e) => {
                    setAddressError(null);
                    setDraftAddress({ ...draftAddress, phone: e.target.value });
                  }}
                  className="w-full border border-[#E0E0E0] rounded-[6px] px-3 py-2 text-[#222222] focus:outline-none focus:border-[#EE4D2D]"
                />
              </div>
              <div>
                <label className="block text-[12px] text-[#666666] mb-1">
                  Detail Alamat <span className="text-[#EE4D2D]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nama jalan, nomor rumah, RT/RW"
                  value={draftAddress.line1}
                  onChange={(e) => {
                    setAddressError(null);
                    setDraftAddress({ ...draftAddress, line1: e.target.value });
                  }}
                  className="w-full border border-[#E0E0E0] rounded-[6px] px-3 py-2 text-[#222222] focus:outline-none focus:border-[#EE4D2D]"
                />
              </div>
              <div>
                <label className="block text-[12px] text-[#666666] mb-1">Kecamatan / Kabupaten</label>
                <input
                  type="text"
                  placeholder="Kecamatan, Kabupaten/Kota"
                  value={draftAddress.line2}
                  onChange={(e) => setDraftAddress({ ...draftAddress, line2: e.target.value })}
                  className="w-full border border-[#E0E0E0] rounded-[6px] px-3 py-2 text-[#222222] focus:outline-none focus:border-[#EE4D2D]"
                />
              </div>
              <div>
                <label className="block text-[12px] text-[#666666] mb-1">Provinsi & Kode Pos</label>
                <input
                  type="text"
                  placeholder="Provinsi, Kode Pos"
                  value={draftAddress.line3}
                  onChange={(e) => setDraftAddress({ ...draftAddress, line3: e.target.value })}
                  className="w-full border border-[#E0E0E0] rounded-[6px] px-3 py-2 text-[#222222] focus:outline-none focus:border-[#EE4D2D]"
                />
              </div>
            </div>
            <div className="p-3.5 border-t border-[#EFEFEF]">
              <button
                type="button"
                onClick={() => {
                  if (
                    !draftAddress.name.trim() ||
                    !draftAddress.phone.trim() ||
                    !draftAddress.line1.trim()
                  ) {
                    setAddressError('Mohon lengkapi Nama Penerima, Nomor Telepon, dan Detail Alamat.');
                    return;
                  }
                  onSaveAddress({
                    name: draftAddress.name.trim(),
                    phone: draftAddress.phone.trim(),
                    line1: draftAddress.line1.trim(),
                    line2: draftAddress.line2.trim(),
                    line3: draftAddress.line3.trim(),
                  });
                  onClose();
                }}
                className="w-full h-[42px] bg-[#EE4D2D] text-white text-[14px] font-medium rounded-[6px]"
              >
                Simpan Alamat
              </button>
            </div>
          </>
        )}

        {activeModal === 'seller_note' && (
          <>
            <div className="px-4 py-3.5 border-b border-[#EFEFEF] flex items-center justify-between">
              <h2 className="text-[15px] font-medium text-[#222222]">Pesan untuk Penjual</h2>
              <button
                type="button"
                onClick={onClose}
                className="p-1 text-[#757575] hover:text-[#222222]"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <textarea
                rows={3}
                placeholder="Tinggalkan pesan untuk penjual (opsional)..."
                value={draftNote}
                onChange={(e) => setDraftNote(e.target.value)}
                className="w-full border border-[#E0E0E0] rounded-[6px] px-3 py-2.5 text-[13px] text-[#222222] focus:outline-none focus:border-[#EE4D2D] resize-none"
              />
            </div>
            <div className="p-3.5 border-t border-[#EFEFEF]">
              <button
                type="button"
                onClick={() => {
                  onSaveSellerNote(draftNote.trim());
                  onClose();
                }}
                className="w-full h-[42px] bg-[#EE4D2D] text-white text-[14px] font-medium rounded-[6px]"
              >
                Simpan
              </button>
            </div>
          </>
        )}

        {activeModal === 'store_voucher' && (
          <>
            <div className="px-4 py-3.5 border-b border-[#EFEFEF] flex items-center justify-between">
              <h2 className="text-[15px] font-medium text-[#222222]">Voucher Toko JUAL MOTOR PRIBADI SDA</h2>
              <button
                type="button"
                onClick={onClose}
                className="p-1 text-[#757575] hover:text-[#222222]"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Masukkan kode voucher toko"
                  value={voucherCodeInput}
                  onChange={(e) => setVoucherCodeInput(e.target.value.toUpperCase())}
                  className="flex-1 border border-[#E0E0E0] rounded-[6px] px-3 py-2 text-[13px] text-[#222222] focus:outline-none focus:border-[#EE4D2D]"
                />
                <button
                  type="button"
                  onClick={() => {
                    onApplyStoreVoucher(voucherCodeInput.trim() || null);
                    onClose();
                  }}
                  className="px-4 bg-[#EE4D2D] text-white text-[13px] font-medium rounded-[6px] whitespace-nowrap"
                >
                  Pakai
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  onApplyStoreVoucher(appliedStoreVoucher === 'BUMIPART5' ? null : 'BUMIPART5');
                  onClose();
                }}
                className={`w-full text-left p-3 rounded-[8px] border flex items-center justify-between ${
                  appliedStoreVoucher === 'BUMIPART5'
                    ? 'border-[#EE4D2D] bg-[#FFF8F6]'
                    : 'border-[#EBEBEB] bg-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Ticket className="w-5 h-5 text-[#EE4D2D]" />
                  <div>
                    <p className="text-[13px] font-medium text-[#222222]">Diskon Toko Rp5.000</p>
                    <p className="text-[11.5px] text-[#757575]">Min. belanja Rp100.000 (Kode: BUMIPART5)</p>
                  </div>
                </div>
                <span className="text-[12px] font-medium text-[#EE4D2D]">
                  {appliedStoreVoucher === 'BUMIPART5' ? 'Dipakai' : 'Pilih'}
                </span>
              </button>
            </div>
          </>
        )}

        {activeModal === 'platform_voucher' && (
          <>
            <div className="px-4 py-3.5 border-b border-[#EFEFEF] flex items-center justify-between">
              <h2 className="text-[15px] font-medium text-[#222222]">Pilih Voucher</h2>
              <button
                type="button"
                onClick={onClose}
                className="p-1 text-[#757575] hover:text-[#222222]"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-2.5 overflow-y-auto">
              <div className="p-3 rounded-[8px] border border-[#26AA99] bg-[#F5FBFA] flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-medium text-[#222222]">Gratis Ongkir s.d. Rp75.000</p>
                  <p className="text-[11.5px] text-[#26AA99] mt-0.5">Otomatis diterapkan untuk Hemat Kargo</p>
                </div>
                <span className="w-5 h-5 rounded-full bg-[#26AA99] text-white flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" />
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  onTogglePlatformVoucher(!appliedPlatformVoucher);
                  onClose();
                }}
                className={`w-full text-left p-3 rounded-[8px] border flex items-center justify-between ${
                  appliedPlatformVoucher
                    ? 'border-[#EE4D2D] bg-[#FFF8F6]'
                    : 'border-[#EBEBEB] bg-white'
                }`}
              >
                <div>
                  <p className="text-[13px] font-medium text-[#222222]">Diskon Belanja Rp10.000</p>
                  <p className="text-[11.5px] text-[#757575] mt-0.5">Berlaku untuk pesanan minimal Rp120.000</p>
                </div>
                <span className="text-[12px] font-medium text-[#EE4D2D]">
                  {appliedPlatformVoucher ? 'Dipakai' : 'Gunakan'}
                </span>
              </button>
            </div>
          </>
        )}

        {activeModal === 'shipping_all' && (
          <>
            <div className="px-4 py-3.5 border-b border-[#EFEFEF] flex items-center justify-between">
              <h2 className="text-[15px] font-medium text-[#222222]">Opsi Pengiriman</h2>
              <button
                type="button"
                onClick={onClose}
                className="p-1 text-[#757575] hover:text-[#222222]"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  onSelectShipping('hemat');
                  onClose();
                }}
                className={`w-full text-left p-3 rounded-[8px] border ${
                  selectedShipping === 'hemat'
                    ? 'border-[#26AA99] bg-[#F5FBFA]'
                    : 'border-[#EBEBEB] bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[13.5px] font-medium text-[#222222] flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#26AA99]" />
                    Hemat Kargo (4 - 7 Des)
                  </span>
                  <span className="text-[13px] tabular-nums">
                    <span className="line-through text-[#999999] mr-1.5">Rp75.000</span>
                    <span className="text-[#222222] font-medium">Rp0</span>
                  </span>
                </div>
                <p className="text-[12px] text-[#26AA99] mt-1">Kamu mendapatkan potongan ongkir!</p>
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelectShipping('reguler');
                  onClose();
                }}
                className={`w-full text-left p-3 rounded-[8px] border ${
                  selectedShipping === 'reguler'
                    ? 'border-[#26AA99] bg-[#F5FBFA]'
                    : 'border-[#EBEBEB] bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[13.5px] font-medium text-[#222222] flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#26AA99]" />
                    Reguler (1 - 4 Des)
                  </span>
                  <span className="text-[13px] text-[#222222] font-medium tabular-nums">Rp120.000</span>
                </div>
                <p className="text-[12px] text-[#757575] mt-1">Estimasi tiba lebih cepat</p>
              </button>
            </div>
          </>
        )}

        {activeModal === 'payment_all' && (
          <>
            <div className="px-4 py-3.5 border-b border-[#EFEFEF] flex items-center justify-between">
              <h2 className="text-[15px] font-medium text-[#222222]">Metode Pembayaran</h2>
              <button
                type="button"
                onClick={onClose}
                className="p-1 text-[#757575] hover:text-[#222222]"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-2.5">
              {[
                { id: 'cod' as const, label: 'COD (Bayar di Tempat)', desc: 'Bayar tunai saat kurir tiba' },
                { id: 'transfer' as const, label: 'Transfer Bank (Virtual Account)', desc: 'BCA, Mandiri, BNI, BRI' },
                { id: 'spaylater' as const, label: 'SPayLater', desc: 'Aktifkan untuk cicilan 0%' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    onSelectPayment(opt.id);
                    onClose();
                  }}
                  className={`w-full text-left p-3 rounded-[8px] border flex items-center justify-between ${
                    selectedPayment === opt.id
                      ? 'border-[#EE4D2D] bg-[#FFF8F6]'
                      : 'border-[#EBEBEB] bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="w-4 h-4 text-[#EE4D2D]" />
                    <div>
                      <p className="text-[13.5px] font-medium text-[#222222]">{opt.label}</p>
                      <p className="text-[11.5px] text-[#757575]">{opt.desc}</p>
                    </div>
                  </div>
                  <div
                    className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center ${
                      selectedPayment === opt.id ? 'border-[#EE4D2D] bg-[#EE4D2D]' : 'border-[#CCCCCC]'
                    }`}
                  >
                    {selectedPayment === opt.id && <Check className="w-3 h-3 text-white" />}
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {activeModal === 'spaylater' && (
          <>
            <div className="px-4 py-3.5 border-b border-[#EFEFEF] flex items-center justify-between">
              <h2 className="text-[15px] font-medium text-[#222222]">Aktivasi SPayLater</h2>
              <button
                type="button"
                onClick={onClose}
                className="p-1 text-[#757575] hover:text-[#222222]"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-3 text-[13px] text-[#555555]">
              <p>
                Aktifkan SPayLater untuk menikmati cicilan 0% dan diskon ekstra hingga Rp50.000 pada transaksi ini.
              </p>
              <div className="p-3 bg-[#FFF8F6] border border-[#F49D8E] rounded-[8px] text-[12px] text-[#EE4D2D]">
                Diskon Extra 99% s.d. 50RB tersedia untuk pengguna baru yang mengaktifkan SPayLater.
              </div>
            </div>
            <div className="p-3.5 border-t border-[#EFEFEF] flex gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 h-[40px] border border-[#E0E0E0] text-[#555555] text-[13.5px] rounded-[6px]"
              >
                Nanti Saja
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelectPayment('spaylater');
                  onClose();
                }}
                className="flex-1 h-[40px] bg-[#EE4D2D] text-white text-[13.5px] font-medium rounded-[6px]"
              >
                Gunakan SPayLater
              </button>
            </div>
          </>
        )}

        {(activeModal === 'protection_info' ||
          activeModal === 'service_fee' ||
          activeModal === 'terms') && (
          <>
            <div className="px-4 py-3.5 border-b border-[#EFEFEF] flex items-center justify-between">
              <h2 className="text-[15px] font-medium text-[#222222] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#EE4D2D]" />
                {activeModal === 'protection_info' && 'Proteksi Kerusakan +'}
                {activeModal === 'service_fee' && 'Biaya Layanan'}
                {activeModal === 'terms' && 'Syarat & Ketentuan Proteksi Produk'}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="p-1 text-[#757575] hover:text-[#222222]"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 text-[13px] text-[#555555] leading-relaxed space-y-2.5">
              {activeModal === 'protection_info' && (
                <p>
                  Proteksi Kerusakan + memberikan kompensasi hingga 100% apabila barang mengalami kerusakan total akibat
                  kecelakaan atau pencurian dalam jangka waktu 6 bulan sejak barang diterima.
                </p>
              )}
              {activeModal === 'service_fee' && (
                <p>
                  Biaya Layanan sebesar Rp1.000 dikenakan untuk mendukung pemeliharaan sistem platform, keamanan
                  transaksi, dan layanan pelanggan 24 jam.
                </p>
              )}
              {activeModal === 'terms' && (
                <p>
                  Dengan mencentang Proteksi Kerusakan + dan menekan tombol Buat Pesanan, Anda menyetujui polis
                  perlindungan produk elektronik & otomotif selama masa pertanggungan 6 bulan sesuai ketentuan mitra
                  asuransi resmi.
                </p>
              )}
            </div>
            <div className="p-3.5 border-t border-[#EFEFEF]">
              <button
                type="button"
                onClick={onClose}
                className="w-full h-[40px] bg-[#EE4D2D] text-white text-[14px] font-medium rounded-[6px]"
              >
                Mengerti
              </button>
            </div>
          </>
        )}

        {activeModal === 'order_success' && (
          <>
            <div className="p-5 text-center space-y-2.5">
              <div className="w-12 h-12 rounded-full bg-[#E8F8F5] text-[#26AA99] flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h2 className="text-[16px] font-semibold text-[#222222]">Pesanan Berhasil Dibuat</h2>
              <p className="text-[13px] text-[#666666]">
                Total pembayaran <span className="font-semibold text-[#EE4D2D] tabular-nums">{totalPaymentFormatted}</span>{' '}
                untuk toko <span className="font-medium text-[#222222]">JUAL MOTOR PRIBADI SDA</span> sedang diproses.
              </p>
            </div>
            <div className="p-3.5 border-t border-[#EFEFEF]">
              <button
                type="button"
                onClick={onClose}
                className="w-full h-[42px] bg-[#EE4D2D] text-white text-[14px] font-medium rounded-[6px]"
              >
                Kembali ke Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
