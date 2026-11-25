import React, { useMemo, useState } from 'react';
import { ChevronRight, Check } from 'lucide-react';
import {
  BackArrowIcon,
  CheckCornerRibbon,
  CoinShopeeIcon,
  ExpressTruckIcon,
  HelpQuestionIcon,
  LocationPinIcon,
  SPayLaterIcon,
  StoreIcon,
  VoucherTicketIcon,
} from './components/Icons';
import { ActiveModal, AddressData, CheckoutModals } from './components/CheckoutModals';
import {
  BankMuamalatMethodIcon,
  PaymentMethodPage,
  SelectedPaymentInfo,
} from './components/PaymentMethodPage';
import { WaitingPaymentPage } from './components/WaitingPaymentPage';

function formatRupiah(amount: number): string {
  return `Rp${amount.toLocaleString('id-ID')}`;
}

export default function App() {
  const [address, setAddress] = useState<AddressData | null>(null);

  const [protectionChecked, setProtectionChecked] = useState(true);
  const [selectedShipping, setSelectedShipping] = useState<'hemat' | 'reguler'>('hemat');
  const [useCoins, setUseCoins] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<'cod' | 'spaylater' | 'transfer' | null>('transfer');
  const [confirmedPaymentInfo, setConfirmedPaymentInfo] = useState<SelectedPaymentInfo | null>({
    id: 'bank_muamalat',
    label: 'Bank Muamalat',
    detail: 'Prioritas',
  });
  const [showPaymentPage, setShowPaymentPage] = useState(false);
  const [showWaitingPaymentPage, setShowWaitingPaymentPage] = useState(false);
  const [isDropshipper, setIsDropshipper] = useState(false);
  const [sellerNote, setSellerNote] = useState('');
  const [appliedStoreVoucher, setAppliedStoreVoucher] = useState<string | null>(null);
  const [appliedPlatformVoucher, setAppliedPlatformVoucher] = useState(false);
  const [addressWarning, setAddressWarning] = useState(false);
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  const productSubtotal = 2000000;
  const protectionFee = protectionChecked ? 1700 : 0;
  const shippingBaseFee = selectedShipping === 'hemat' ? 75000 : 120000;
  const shippingDiscount = selectedShipping === 'hemat' ? 75000 : 0;
  const serviceFee = 1000;
  const storeVoucherDiscount = appliedStoreVoucher ? 5000 : 0;
  const platformVoucherDiscount = appliedPlatformVoucher ? 10000 : 0;
  const coinDiscount = useCoins ? 65 : 0;

  const productSectionTotal = useMemo(
    () => Math.max(0, productSubtotal + protectionFee - storeVoucherDiscount),
    [productSubtotal, protectionFee, storeVoucherDiscount]
  );

  const totalSavings = useMemo(
    () => shippingDiscount + storeVoucherDiscount + platformVoucherDiscount + coinDiscount,
    [shippingDiscount, storeVoucherDiscount, platformVoucherDiscount, coinDiscount]
  );

  const totalPayment = useMemo(
    () =>
      Math.max(
        0,
        productSubtotal +
          protectionFee +
          shippingBaseFee +
          serviceFee -
          shippingDiscount -
          storeVoucherDiscount -
          platformVoucherDiscount -
          coinDiscount
      ),
    [
      productSubtotal,
      protectionFee,
      shippingBaseFee,
      serviceFee,
      shippingDiscount,
      storeVoucherDiscount,
      platformVoucherDiscount,
      coinDiscount,
    ]
  );

  const handlePlaceOrder = () => {
    if (!address || !address.name.trim() || !address.phone.trim() || !address.line1.trim()) {
      setAddressWarning(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveModal('address');
      return;
    }
    setAddressWarning(false);
    setShowWaitingPaymentPage(true);
  };

  const handleSelectPayment = (method: 'cod' | 'spaylater' | 'transfer') => {
    setSelectedPayment((prev) => (prev === method ? null : method));
  };

  if (showWaitingPaymentPage) {
    return (
      <WaitingPaymentPage
        totalOrderAmount={totalPayment}
        address={address}
        onBack={() => setShowWaitingPaymentPage(false)}
      />
    );
  }

  if (showPaymentPage) {
    return (
      <PaymentMethodPage
        initialPayment={confirmedPaymentInfo}
        onBack={() => setShowPaymentPage(false)}
        onConfirm={(payment) => {
          setConfirmedPaymentInfo(payment);
          if (payment.id === 'spaylater') {
            setSelectedPayment('spaylater');
          } else if (payment.id === 'cod') {
            setSelectedPayment('cod');
          } else {
            setSelectedPayment('transfer');
          }
          setShowPaymentPage(false);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#EFEFEF] flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-[#F5F5F5] flex flex-col relative shadow-[0_0_24px_rgba(0,0,0,0.06)]">
        {/* Top Navigation Header */}
        <header className="sticky top-0 z-30 h-[52px] bg-white px-3.5 flex items-center gap-3.5 border-b border-[#F2F2F2]">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="w-8 h-8 -ml-1 flex items-center justify-center rounded-full active:bg-black/5 transition-colors"
            aria-label="Kembali"
          >
            <BackArrowIcon className="w-[22px] h-[22px]" />
          </button>
          <h1 className="text-[18px] font-normal text-[#222222] leading-none tracking-[-0.01em]">
            Checkout
          </h1>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 pb-[76px]">
          {/* Shipping Address Section */}
          <section className="bg-white rounded-b-[10px] mb-2.5 overflow-hidden">
            <button
              type="button"
              onClick={() => setActiveModal('address')}
              className="w-full text-left px-3.5 py-3.5 flex items-center justify-between gap-2 active:bg-[#FAFAFA] transition-colors"
            >
              {address ? (
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <LocationPinIcon className="w-[16px] h-[16px] shrink-0" />
                    <span className="text-[13.5px] font-semibold text-[#222222] truncate">
                      {address.name}
                    </span>
                    <span className="text-[13px] font-normal text-[#757575] tabular-nums shrink-0">
                      {address.phone}
                    </span>
                  </div>
                  <div className="pl-[22px] mt-1 text-[12px] text-[#333333] leading-[1.42]">
                    {address.line1 && <p>{address.line1}</p>}
                    {address.line2 && <p>{address.line2}</p>}
                    {address.line3 && <p>{address.line3}</p>}
                  </div>
                </div>
              ) : (
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <LocationPinIcon className="w-[16px] h-[16px] shrink-0" />
                    <span className="text-[13.5px] font-normal text-[#222222]">
                      Tambahkan alamat
                    </span>
                  </div>
                  {addressWarning && (
                    <p className="pl-[22px] mt-1 text-[11.5px] text-[#EE4D2D]">
                      Wajib mengisi alamat pengiriman sebelum membuat pesanan.
                    </p>
                  )}
                </div>
              )}
              <ChevronRight className="w-[17px] h-[17px] text-[#888888] shrink-0" strokeWidth={1.7} />
            </button>
          </section>

          {/* Store & Product Card */}
          <section className="bg-white rounded-[10px] mx-2 mb-2.5 overflow-hidden">
            {/* Store Name */}
            <div className="px-3.5 pt-3.5 pb-2.5 flex items-center gap-2">
              <StoreIcon className="w-[16px] h-[16px] shrink-0" />
              <span className="text-[13.5px] font-medium text-[#222222]">JUAL MOTOR PRIBADI SDA</span>
            </div>

            {/* Product Item */}
            <div className="px-3.5 pb-3 flex gap-2.5">
              <img
                src="/assets/aistudio/IMG-20251111-WA0024_3764ebd6.jpg"
                alt="Honda Astrea prima 1991"
                referrerPolicy="no-referrer"
                className="w-[74px] h-[74px] rounded-[6px] border border-[#F0F0F0] object-cover shrink-0 bg-white"
              />
              <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                <div>
                  <p className="text-[13px] font-normal text-[#222222] leading-[1.3] truncate">
                    Honda Astrea prima 1991
                  </p>
                  <p className="text-[11.5px] text-[#888888] mt-0.5 leading-[1.35]">
                    Mesin mulus, kelistrikan normal semua
                  </p>
                </div>
                <div className="flex items-baseline justify-between mt-2.5">
                  <span className="text-[13.5px] font-medium text-[#EE4D2D] tabular-nums">
                    {formatRupiah(productSubtotal)}
                  </span>
                  <span className="text-[12px] text-[#555555] tabular-nums">x1</span>
                </div>
              </div>
            </div>

            {/* Proteksi Kerusakan + Box */}
            <div className="px-3.5 pb-3.5">
              <div className="bg-[#FAFAFA] rounded-[6px] p-2.5 flex items-start gap-2.5">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={protectionChecked}
                  aria-label="Pilih Proteksi Kerusakan +"
                  onClick={() => setProtectionChecked((prev) => !prev)}
                  className={`w-[17px] h-[17px] rounded-[4px] flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    protectionChecked
                      ? 'bg-[#EE4D2D] border border-[#EE4D2D]'
                      : 'bg-white border border-[#CCCCCC]'
                  }`}
                >
                  {protectionChecked && <Check className="w-[12px] h-[12px] text-white" strokeWidth={3} />}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[12.5px] font-medium text-[#222222]">
                      Proteksi Kerusakan +
                    </span>
                    <span className="text-[12px] text-[#222222] tabular-nums shrink-0">
                      Rp1.700 x 1
                    </span>
                  </div>
                  <p className="text-[11px] text-[#666666] leading-[1.38] mt-1">
                    Dapatkan kompensasi 100% jika barang rusak total atau dicuri dalam 6 bulan.{' '}
                    <button
                      type="button"
                      onClick={() => setActiveModal('protection_info')}
                      className="inline-flex items-center text-[#555555] hover:text-[#222222]"
                    >
                      <span>Pelajari</span>
                      <ChevronRight className="w-[12px] h-[12px] ml-0.5 inline" strokeWidth={1.8} />
                    </button>
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-[#F2F2F2]" />

            {/* Voucher Toko */}
            <button
              type="button"
              onClick={() => setActiveModal('store_voucher')}
              className="w-full px-3.5 py-3 flex items-center justify-between active:bg-[#FAFAFA] transition-colors"
            >
              <span className="text-[13px] text-[#222222]">Voucher Toko</span>
              <span className="flex items-center gap-1 text-[12.5px]">
                <span className={appliedStoreVoucher ? 'text-[#EE4D2D] font-medium' : 'text-[#999999]'}>
                  {appliedStoreVoucher ? `${appliedStoreVoucher} (-Rp5.000)` : 'Gunakan/ masukkan kode'}
                </span>
                <ChevronRight className="w-[15px] h-[15px] text-[#999999]" strokeWidth={1.7} />
              </span>
            </button>

            {/* Pesan untuk Penjual */}
            <button
              type="button"
              onClick={() => setActiveModal('seller_note')}
              className="w-full px-3.5 py-3 flex items-center justify-between active:bg-[#FAFAFA] transition-colors"
            >
              <span className="text-[13px] text-[#222222]">Pesan untuk Penjual</span>
              <span className="flex items-center gap-1 text-[12.5px] max-w-[55%]">
                <span className={`truncate ${sellerNote ? 'text-[#222222]' : 'text-[#999999]'}`}>
                  {sellerNote || 'Tinggalkan pesan'}
                </span>
                <ChevronRight className="w-[15px] h-[15px] text-[#999999] shrink-0" strokeWidth={1.7} />
              </span>
            </button>

            <div className="border-t border-[#F2F2F2]" />

            {/* Opsi Pengiriman */}
            <div className="px-3.5 pt-3 pb-3">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[13px] font-medium text-[#222222]">Opsi Pengiriman</span>
                <button
                  type="button"
                  onClick={() => setActiveModal('shipping_all')}
                  className="flex items-center gap-0.5 text-[12px] text-[#757575] hover:text-[#222222]"
                >
                  <span>Lihat Semua</span>
                  <ChevronRight className="w-[14px] h-[14px] text-[#999999]" strokeWidth={1.7} />
                </button>
              </div>

              {/* Hemat Kargo */}
              <button
                type="button"
                onClick={() => setSelectedShipping('hemat')}
                className={`w-full text-left rounded-[6px] px-3 py-2.5 mb-2 relative overflow-hidden transition-colors ${
                  selectedShipping === 'hemat'
                    ? 'border border-[#26AA99] bg-[#F5FBFA]'
                    : 'border border-[#EBEBEB] bg-white'
                }`}
              >
                {selectedShipping === 'hemat' && (
                  <span className="absolute top-0 left-0">
                    <CheckCornerRibbon className="w-[22px] h-[22px]" />
                  </span>
                )}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[12.5px] font-medium text-[#222222]">4 - 7 Des</span>
                  <span className="flex items-center gap-1.5 text-[12.5px] tabular-nums">
                    <span className="text-[#999999] line-through text-[11.5px]">Rp75.000</span>
                    <span className="text-[#222222] font-normal">Rp0</span>
                  </span>
                </div>
                <p className="text-[12px] text-[#555555] mt-1">Hemat Kargo</p>
                <p className="text-[11.5px] text-[#26AA99] mt-1">
                  Kamu mendapatkan potongan ongkir!
                </p>
              </button>

              {/* Reguler */}
              <button
                type="button"
                onClick={() => setSelectedShipping('reguler')}
                className={`w-full text-left rounded-[6px] px-3 py-2.5 relative overflow-hidden transition-colors ${
                  selectedShipping === 'reguler'
                    ? 'border border-[#26AA99] bg-[#F5FBFA]'
                    : 'border border-[#EBEBEB] bg-white'
                }`}
              >
                {selectedShipping === 'reguler' && (
                  <span className="absolute top-0 left-0">
                    <CheckCornerRibbon className="w-[22px] h-[22px]" />
                  </span>
                )}
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 text-[12.5px] font-medium text-[#26AA99]">
                    <ExpressTruckIcon className="w-[17px] h-[13px]" />
                    <span>1 - 4 Des</span>
                  </span>
                  <span className="text-[12.5px] text-[#222222] tabular-nums">Rp120.000</span>
                </div>
                <p className="text-[12px] text-[#555555] mt-1">Reguler</p>
              </button>

              {/* Late Delivery Guarantee Note */}
              <div className="flex items-center gap-1 mt-3 text-[11.5px] text-[#757575]">
                <span>Voucher s.d. Rp10.000 jika pesanan terlambat.</span>
                <button
                  type="button"
                  onClick={() => setActiveModal('shipping_all')}
                  aria-label="Info garansi keterlambatan"
                  className="inline-flex items-center justify-center"
                >
                  <HelpQuestionIcon className="w-[13px] h-[13px]" />
                </button>
              </div>
            </div>

            <div className="border-t border-[#F2F2F2]" />

            {/* Total 1 Produk */}
            <div className="px-3.5 py-3 flex items-center justify-between">
              <span className="text-[13px] text-[#222222]">Total 1 Produk</span>
              <span className="text-[13.5px] font-medium text-[#222222] tabular-nums">
                {formatRupiah(productSectionTotal)}
              </span>
            </div>
          </section>

          {/* Voucher & Koin Shopee Card */}
          <section className="bg-white rounded-[10px] mx-2 mb-2.5 overflow-hidden">
            <button
              type="button"
              onClick={() => setActiveModal('platform_voucher')}
              className="w-full px-3.5 py-3 flex items-center justify-between active:bg-[#FAFAFA] transition-colors"
            >
              <span className="flex items-center gap-2">
                <VoucherTicketIcon className="w-[18px] h-[18px]" />
                <span className="text-[13px] text-[#222222]">Voucher</span>
              </span>
              <span className="flex items-center gap-1 text-[12.5px]">
                <span className={appliedPlatformVoucher ? 'text-[#EE4D2D] font-medium' : 'text-[#999999]'}>
                  {appliedPlatformVoucher ? 'Diskon Rp10.000' : 'Gunakan/ masukkan kode'}
                </span>
                <ChevronRight className="w-[15px] h-[15px] text-[#999999]" strokeWidth={1.7} />
              </span>
            </button>

            <div className="border-t border-[#F2F2F2]" />

            <div className="px-3.5 py-3 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CoinShopeeIcon className="w-[18px] h-[18px]" />
                <span className="text-[13px] text-[#222222]">Tukarkan 65 Koin Shopee</span>
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={useCoins}
                aria-label="Tukarkan 65 Koin Shopee"
                onClick={() => setUseCoins((prev) => !prev)}
                className={`w-[42px] h-[24px] rounded-full p-[2px] transition-colors duration-200 flex items-center ${
                  useCoins ? 'bg-[#26AA99] justify-end' : 'bg-[#E2E2E2] justify-start'
                }`}
              >
                <span className="w-[20px] h-[20px] rounded-full bg-white shadow-sm block" />
              </button>
            </div>
          </section>

          {/* Metode Pembayaran Card */}
          <section className="bg-white rounded-[10px] mx-2 mb-2.5 overflow-hidden">
            <div className="px-3.5 pt-3.5 pb-2 flex items-center justify-between">
              <span className="text-[13px] font-medium text-[#222222]">Metode Pembayaran</span>
              <button
                type="button"
                onClick={() => setShowPaymentPage(true)}
                className="flex items-center gap-0.5 text-[12px] text-[#757575] hover:text-[#222222]"
              >
                <span>Lihat Semua</span>
                <ChevronRight className="w-[14px] h-[14px] text-[#999999]" strokeWidth={1.7} />
              </button>
            </div>

            {confirmedPaymentInfo && confirmedPaymentInfo.id !== 'spaylater' && (
              <>
                <button
                  type="button"
                  onClick={() => setShowPaymentPage(true)}
                  className="w-full px-3.5 py-2.5 flex items-center justify-between active:bg-[#FAFAFA] transition-colors"
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    {(confirmedPaymentInfo.id === 'bank_muamalat' ||
                      confirmedPaymentInfo.detail?.includes('Bank Muamalat')) && (
                      <span className="shrink-0 scale-90">
                        <BankMuamalatMethodIcon />
                      </span>
                    )}
                    <span className="text-[13px] font-medium text-[#222222] truncate">
                      {confirmedPaymentInfo.label}
                    </span>
                    {confirmedPaymentInfo.detail && (
                      <span className="text-[11px] text-[#EE4D2D] border border-[#F49D8E] bg-[#FFF5F2] px-1.5 py-[1px] rounded-[3px] shrink-0">
                        {confirmedPaymentInfo.detail}
                      </span>
                    )}
                  </span>
                  <span className="w-[18px] h-[18px] rounded-full bg-[#EE4D2D] flex items-center justify-center shrink-0">
                    <Check className="w-[11px] h-[11px] text-white" strokeWidth={3} />
                  </span>
                </button>
                <div className="border-t border-[#F2F2F2] mx-3.5" />
              </>
            )}

            {/* SPayLater Section */}
            <div className="px-3.5 pt-2.5 pb-3.5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2.5">
                  <SPayLaterIcon className="w-[18px] h-[18px]" />
                  <span className="text-[13px] text-[#222222]">SPayLater</span>
                </span>
                <button
                  type="button"
                  onClick={() => setActiveModal('spaylater')}
                  className={`text-[12px] px-3 py-1 rounded-[4px] border transition-colors ${
                    selectedPayment === 'spaylater'
                      ? 'bg-[#EE4D2D] border-[#EE4D2D] text-white'
                      : 'border-[#EE4D2D] text-[#EE4D2D] bg-white hover:bg-[#FFF5F2]'
                  }`}
                >
                  {selectedPayment === 'spaylater' ? 'Dipilih' : 'Aktifkan'}
                </button>
              </div>

              <p className="pl-[28px] mt-1.5 text-[12px] text-[#555555] leading-[1.35]">
                Aktifkan SPayLater Pasti Dapat Diskon s.d. 50RB
              </p>

              {/* Installment Boxes */}
              <div className="pl-[28px] mt-2.5 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModal('spaylater')}
                  className="text-left bg-[#F7F7F7] rounded-[6px] p-2.5 hover:bg-[#F1F1F1] transition-colors"
                >
                  <div className="flex items-baseline justify-between gap-1 text-[#888888] tabular-nums">
                    <span className="text-[12px]">Rp88.700</span>
                    <span className="text-[11.5px]">x 1 bln</span>
                  </div>
                  <div className="mt-1.5 flex flex-col items-start gap-1">
                    <span className="border border-[#F49D8E] text-[#EE4D2D] text-[10px] px-1 py-[1px] rounded-[2px] leading-tight">
                      Diskon Extra 99%
                    </span>
                    <span className="border border-[#F49D8E] text-[#EE4D2D] text-[10px] px-1 py-[1px] rounded-[2px] leading-tight">
                      Cicilan 0%
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModal('spaylater')}
                  className="text-left bg-[#F7F7F7] rounded-[6px] p-2.5 hover:bg-[#F1F1F1] transition-colors"
                >
                  <div className="flex items-baseline justify-between gap-1 text-[#888888] tabular-nums">
                    <span className="text-[12px]">Rp14.783</span>
                    <span className="text-[11.5px]">x 6 bln</span>
                  </div>
                  <div className="mt-1.5 flex flex-col items-start gap-1">
                    <span className="border border-[#F49D8E] text-[#EE4D2D] text-[10px] px-1 py-[1px] rounded-[2px] leading-tight">
                      Diskon Extra 99%
                    </span>
                    <span className="border border-[#F49D8E] text-[#EE4D2D] text-[10px] px-1 py-[1px] rounded-[2px] leading-tight">
                      Cicilan 0%
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </section>

          {/* Rincian Pembayaran Card */}
          <section className="bg-white rounded-[10px] mx-2 mb-2.5 px-3.5 py-3.5">
            <h2 className="text-[13.5px] font-medium text-[#222222] mb-2.5">Rincian Pembayaran</h2>

            <div className="space-y-2 text-[12px]">
              <div className="flex items-center justify-between">
                <span className="text-[#555555]">Subtotal Pesanan</span>
                <span className="text-[#222222] tabular-nums">{formatRupiah(productSubtotal)}</span>
              </div>

              {protectionChecked && (
                <div className="flex items-center justify-between">
                  <span className="text-[#555555]">Total Proteksi Produk</span>
                  <span className="text-[#222222] tabular-nums">{formatRupiah(protectionFee)}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-[#555555]">Subtotal Pengiriman</span>
                <span className="text-[#222222] tabular-nums">{formatRupiah(shippingBaseFee)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-[#555555]">
                  <span>Biaya Layanan</span>
                  <button
                    type="button"
                    onClick={() => setActiveModal('service_fee')}
                    aria-label="Info Biaya Layanan"
                    className="inline-flex items-center"
                  >
                    <HelpQuestionIcon className="w-[13px] h-[13px]" />
                  </button>
                </span>
                <span className="text-[#222222] tabular-nums">{formatRupiah(serviceFee)}</span>
              </div>

              {shippingDiscount > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-[#555555]">Total Diskon Pengiriman</span>
                  <span className="text-[#EE4D2D] tabular-nums">-{formatRupiah(shippingDiscount)}</span>
                </div>
              )}

              {storeVoucherDiscount > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-[#555555]">Voucher Toko</span>
                  <span className="text-[#EE4D2D] tabular-nums">-{formatRupiah(storeVoucherDiscount)}</span>
                </div>
              )}

              {platformVoucherDiscount > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-[#555555]">Voucher Diskon</span>
                  <span className="text-[#EE4D2D] tabular-nums">-{formatRupiah(platformVoucherDiscount)}</span>
                </div>
              )}

              {coinDiscount > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-[#555555]">Koin Shopee Ditukarkan</span>
                  <span className="text-[#EE4D2D] tabular-nums">-{formatRupiah(coinDiscount)}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mt-3 pt-0.5 text-[13.5px] font-medium text-[#222222]">
              <span>Total Pembayaran</span>
              <span className="tabular-nums">{formatRupiah(totalPayment)}</span>
            </div>
          </section>

          {/* Kirim sebagai Dropshipper Card */}
          <section className="bg-white rounded-[10px] mx-2 mb-3 px-3.5 py-3 flex items-center justify-between">
            <span className="text-[13px] font-medium text-[#222222]">Kirim sebagai Dropshipper</span>
            <button
              type="button"
              role="switch"
              aria-checked={isDropshipper}
              aria-label="Kirim sebagai Dropshipper"
              onClick={() => setIsDropshipper((prev) => !prev)}
              className={`w-[42px] h-[24px] rounded-full p-[2px] transition-colors duration-200 flex items-center ${
                isDropshipper ? 'bg-[#26AA99] justify-end' : 'bg-[#E2E2E2] justify-start'
              }`}
            >
              <span className="w-[20px] h-[20px] rounded-full bg-white shadow-sm block" />
            </button>
          </section>

          {/* Legal Consent Copy */}
          <p className="px-4 pb-5 text-[11.5px] text-[#555555] leading-[1.45]">
            Dengan klik “Buat Pesanan”, saya telah menyetujui{' '}
            <button
              type="button"
              onClick={() => setActiveModal('terms')}
              className="text-[#1A73E8] hover:underline text-left inline"
            >
              Syarat &amp; Ketentuan Proteksi Produk.
            </button>
          </p>
        </main>

        {/* Bottom Sticky Action Bar */}
        <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-[#EFEFEF] px-3 py-2 flex items-center justify-end gap-3 z-30">
          <div className="text-right leading-tight">
            <div className="flex items-baseline justify-end gap-1">
              <span className="text-[12px] text-[#222222]">Total</span>
              <span className="text-[15.5px] font-semibold text-[#EE4D2D] tabular-nums">
                {formatRupiah(totalPayment)}
              </span>
            </div>
            {totalSavings > 0 && (
              <div className="flex items-baseline justify-end gap-1 mt-0.5">
                <span className="text-[11px] text-[#222222]">Hemat</span>
                <span className="text-[11px] text-[#EE4D2D] tabular-nums">
                  {formatRupiah(totalSavings)}
                </span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handlePlaceOrder}
            className="bg-[#EE4D2D] hover:bg-[#DC3D1E] active:scale-[0.98] transition-all text-white font-medium text-[14px] px-6 h-[40px] rounded-[6px] whitespace-nowrap shrink-0"
          >
            Buat Pesanan
          </button>
        </footer>

        <CheckoutModals
          activeModal={activeModal}
          onClose={() => setActiveModal(null)}
          address={address}
          onSaveAddress={(next) => {
            setAddress(next);
            if (next) setAddressWarning(false);
          }}
          sellerNote={sellerNote}
          onSaveSellerNote={setSellerNote}
          selectedShipping={selectedShipping}
          onSelectShipping={setSelectedShipping}
          selectedPayment={selectedPayment}
          onSelectPayment={handleSelectPayment}
          appliedStoreVoucher={appliedStoreVoucher}
          onApplyStoreVoucher={setAppliedStoreVoucher}
          appliedPlatformVoucher={appliedPlatformVoucher}
          onTogglePlatformVoucher={setAppliedPlatformVoucher}
          totalPaymentFormatted={formatRupiah(totalPayment)}
        />
      </div>
    </div>
  );
}
