import React, { useState } from 'react';
import { ArrowLeft, Check, ChevronDown, ChevronRight, ChevronUp } from 'lucide-react';
import { HelpQuestionIcon } from './Icons';

export interface SelectedPaymentInfo {
  id: string;
  label: string;
  detail?: string;
}

interface PaymentMethodPageProps {
  initialPayment: SelectedPaymentInfo | null;
  onBack: () => void;
  onConfirm: (payment: SelectedPaymentInfo) => void;
}

function GaransiShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-[16px] h-[16px]" aria-hidden="true">
      <path
        d="M12 2.5L4.5 5.5V11.2C4.5 16.05 7.7 20.5 12 21.8C16.3 20.5 19.5 16.05 19.5 11.2V5.5L12 2.5Z"
        stroke="#EE4D2D"
        strokeWidth="1.8"
        fill="#FFFFFF"
      />
      <path
        d="M14.2 9.4C14.2 8.5 13.3 8 12.1 8C10.9 8 10 8.55 10 9.45C10 10.3 10.75 10.7 12.1 11.05C13.5 11.4 14.35 11.85 14.35 12.85C14.35 13.8 13.4 14.45 12.05 14.45C10.8 14.45 9.85 13.9 9.7 13"
        stroke="#EE4D2D"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BankMuamalatMethodIcon() {
  return (
    <div className="w-[24px] h-[24px] rounded-[5px] bg-[#50237F] flex items-center justify-center relative overflow-hidden">
      <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px]" aria-hidden="true">
        <path
          d="M5 17V7L9.5 12.5L14 7V17"
          stroke="#FFFFFF"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="17.8" cy="14.5" r="2.3" fill="#D4AF37" />
      </svg>
    </div>
  );
}

function ShopeePayMethodIcon() {
  return (
    <svg viewBox="0 0 28 24" fill="none" className="w-[24px] h-[20px]" aria-hidden="true">
      <path
        d="M3 7.5L19.5 3.5V7H23C24.1 7 25 7.9 25 9V19C25 20.1 24.1 21 23 21H5C3.9 21 3 20.1 3 19V7.5Z"
        stroke="#EE4D2D"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="#FFFFFF"
      />
      <path
        d="M15.8 11.3C15.8 10.4 14.95 9.9 13.85 9.9C12.75 9.9 11.9 10.45 11.9 11.3C11.9 12.1 12.6 12.45 13.85 12.8C15.15 13.15 15.95 13.6 15.95 14.55C15.95 15.45 15.05 16.05 13.8 16.05C12.65 16.05 11.75 15.5 11.6 14.65"
        stroke="#EE4D2D"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BankTransferMethodIcon() {
  return (
    <svg viewBox="0 0 28 28" fill="none" className="w-[23px] h-[23px]" aria-hidden="true">
      <circle cx="14" cy="14" r="10.5" stroke="#F5A623" strokeWidth="1.7" />
      <path
        d="M9.5 11.5H18.5M18.5 11.5L16 9M18.5 11.5L16 14"
        stroke="#F5A623"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.5 16.5H9.5M9.5 16.5L12 14M9.5 16.5L12 19"
        stroke="#F5A623"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CreditCardMethodIcon() {
  return (
    <svg viewBox="0 0 28 24" fill="none" className="w-[23px] h-[19px]" aria-hidden="true">
      <rect x="3" y="4.5" width="22" height="15" rx="2" stroke="#1E60B8" strokeWidth="1.7" />
      <path d="M3 9.5H25" stroke="#1E60B8" strokeWidth="2.2" />
      <path d="M6.5 15H11" stroke="#1E60B8" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CashOnDeliveryMethodIcon({ disabled = false }: { disabled?: boolean }) {
  const strokeColor = disabled ? '#BBBBBB' : '#EE4D2D';
  return (
    <svg viewBox="0 0 28 26" fill="none" className="w-[23px] h-[22px]" aria-hidden="true">
      <rect x="5" y="10" width="18" height="12" rx="1.5" stroke={strokeColor} strokeWidth="1.6" />
      <path d="M3.5 7.5H24.5V10.5H3.5V7.5Z" stroke={strokeColor} strokeWidth="1.6" strokeLinejoin="round" />
      <path
        d="M14 7.5C14 5.5 11.8 4 10.5 5C9.4 5.8 10.5 7.5 14 7.5ZM14 7.5C14 5.5 16.2 4 17.5 5C18.6 5.8 17.5 7.5 14 7.5Z"
        stroke={strokeColor}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <text
        x="14"
        y="19"
        textAnchor="middle"
        fill={strokeColor}
        fontSize="9"
        fontWeight="700"
        fontFamily="sans-serif"
      >
        $
      </text>
    </svg>
  );
}

function CreditInstallmentMethodIcon() {
  return (
    <svg viewBox="0 0 28 24" fill="none" className="w-[23px] h-[20px]" aria-hidden="true">
      <rect x="3" y="4.5" width="20" height="14" rx="2" stroke="#26AA99" strokeWidth="1.6" />
      <path d="M3 9H23" stroke="#26AA99" strokeWidth="2" />
      <circle cx="20.5" cy="16.5" r="4.5" fill="#FFFFFF" stroke="#26AA99" strokeWidth="1.5" />
      <path d="M20.5 14.5V16.7L22 17.5" stroke="#26AA99" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function AlfamartMethodIcon() {
  return (
    <div className="w-[23px] h-[23px] rounded-[3px] border border-[#E5E5E5] bg-white flex flex-col items-center justify-center overflow-hidden">
      <span className="text-[5.5px] font-extrabold text-[#D71920] leading-none tracking-tight">Alfamart</span>
      <div className="w-full h-[3px] mt-[2px] flex">
        <span className="flex-1 bg-[#D71920]" />
        <span className="flex-1 bg-[#0055A5]" />
        <span className="flex-1 bg-[#FFD100]" />
      </div>
    </div>
  );
}

function IndomaretMethodIcon() {
  return (
    <div className="w-[23px] h-[23px] rounded-[3px] border border-[#E5E5E5] bg-white flex flex-col items-center justify-center overflow-hidden px-0.5">
      <div className="w-full h-[2.5px] bg-[#0055A5] mb-[1px]" />
      <span className="text-[4.8px] font-extrabold text-[#0055A5] leading-none tracking-tight">Indomaret</span>
      <div className="w-full h-[2.5px] mt-[1px] flex">
        <span className="flex-1 bg-[#D71920]" />
        <span className="flex-1 bg-[#FFD100]" />
      </div>
    </div>
  );
}

function BcaOneKlikMethodIcon({ disabled = false }: { disabled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke={disabled ? '#BDBDBD' : '#005DAA'} strokeWidth="4.2" />
    </svg>
  );
}

function BriDirectDebitMethodIcon({ disabled = false }: { disabled?: boolean }) {
  return (
    <div
      className={`w-[23px] h-[23px] rounded-[4px] flex flex-col items-center justify-center text-white leading-none ${
        disabled ? 'bg-[#BDBDBD]' : 'bg-[#00529C]'
      }`}
    >
      <span className="text-[7.5px] font-extrabold tracking-tight">BRI</span>
      <span className="text-[4px] font-medium opacity-90 mt-[1px]">direct debit</span>
    </div>
  );
}

function KredivoMethodIcon() {
  return (
    <div className="w-[23px] h-[23px] rounded-[3px] border border-[#E5E5E5] bg-white flex items-center justify-center">
      <svg viewBox="0 0 20 20" fill="none" className="w-[16px] h-[16px]" aria-hidden="true">
        <rect x="3" y="3" width="3.5" height="14" rx="0.8" fill="#1D9BF0" />
        <path d="M7.5 10L15 3.5H17.5L10.5 10L17.5 16.5H15L7.5 10Z" fill="#FF7A00" />
      </svg>
    </div>
  );
}

const BANK_OPTIONS = [
  { name: 'Bank Muamalat (Dicek Otomatis)', available: true },
  { name: 'Bank BCA (Dicek Otomatis)', available: false },
  { name: 'Bank Mandiri (Dicek Otomatis)', available: false },
  { name: 'Bank BNI (Dicek Otomatis)', available: false },
  { name: 'Bank BRI (Dicek Otomatis)', available: false },
  { name: 'SeaBank (Dicek Otomatis)', available: false },
];

export function PaymentMethodPage({
  initialPayment,
  onBack,
  onConfirm,
}: PaymentMethodPageProps) {
  const [selectedId, setSelectedId] = useState<string>(initialPayment?.id ?? 'bank_muamalat');
  const [selectedBank, setSelectedBank] = useState<string>('Bank Muamalat (Dicek Otomatis)');
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [infoTip, setInfoTip] = useState<string | null>(null);

  const toggleExpand = (group: string) => {
    setExpandedGroup((prev) => (prev === group ? null : group));
  };

  const buildConfirmedPayment = (): SelectedPaymentInfo => {
    switch (selectedId) {
      case 'bank_muamalat':
        return { id: 'bank_muamalat', label: 'Bank Muamalat', detail: 'Prioritas' };
      case 'shopeepay':
        return { id: 'shopeepay', label: 'ShopeePay' };
      case 'bank_transfer':
        return { id: 'bank_transfer', label: 'Bank Transfer', detail: selectedBank };
      case 'credit_card':
        return { id: 'credit_card', label: 'Kartu Kredit / Debit' };
      case 'credit_installment':
        return { id: 'credit_installment', label: 'Cicilan Kartu Kredit' };
      case 'alfamart':
        return { id: 'alfamart', label: 'Alfamart' };
      case 'indomaret':
        return { id: 'indomaret', label: 'Indomaret / i.Saku' };
      case 'kredivo':
        return { id: 'kredivo', label: 'Kredivo' };
      default:
        return { id: 'bank_muamalat', label: 'Bank Muamalat', detail: 'Prioritas' };
    }
  };

  const showInfo = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    setInfoTip((prev) => (prev === text ? null : text));
  };

  return (
    <div className="min-h-screen w-full bg-[#EFEFEF] flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-[#F5F5F5] flex flex-col relative shadow-[0_0_24px_rgba(0,0,0,0.06)]">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-[54px] bg-white px-3.5 flex items-center gap-4 border-b border-[#EFEFEF]">
          <button
            type="button"
            onClick={onBack}
            className="w-8 h-8 -ml-1 flex items-center justify-center rounded-full active:bg-black/5 transition-colors"
            aria-label="Kembali ke Checkout"
          >
            <ArrowLeft className="w-[22px] h-[22px] text-[#666666]" strokeWidth={1.8} />
          </button>
          <h1 className="text-[18px] font-normal text-[#222222] leading-none">
            Metode Pembayaran
          </h1>
        </header>

        {/* Scrollable Payment List */}
        <main className="flex-1 pb-[76px]">
          {/* GARANSI SHOPEE Subheader */}
          <div className="px-4 py-2.5 bg-[#F5F5F5] flex items-center gap-2">
            <span className="text-[13px] tracking-[0.02em] text-[#757575] uppercase">
              GARANSI SHOPEE
            </span>
            <GaransiShieldIcon />
          </div>

          {infoTip && (
            <div className="mx-3 mb-2 px-3 py-2 bg-[#FFF8F6] border border-[#F49D8E] rounded-[6px] text-[12px] text-[#555555] flex items-center justify-between gap-2">
              <span>{infoTip}</span>
              <button
                type="button"
                onClick={() => setInfoTip(null)}
                className="text-[#EE4D2D] font-medium shrink-0"
              >
                Tutup
              </button>
            </div>
          )}

          {/* List Container */}
          <div className="bg-white divide-y divide-[#F0F0F0]">
            {/* 1. Bank Muamalat (Prioritas) */}
            <button
              type="button"
              onClick={() => {
                setSelectedId('bank_muamalat');
                setInfoTip(null);
              }}
              className="w-full px-4 py-3.5 flex items-center justify-between text-left bg-[#FFFDFC] active:bg-[#FAFAFA]"
            >
              <span className="flex items-start gap-3.5 min-w-0">
                <span className="w-[26px] flex items-center justify-center shrink-0 mt-0.5">
                  <BankMuamalatMethodIcon />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[14px] font-medium text-[#222222]">Bank Muamalat</span>
                    <span className="text-[10.5px] font-medium text-[#EE4D2D] border border-[#F49D8E] bg-[#FFF5F2] px-1.5 py-[1px] rounded-[3px] leading-tight">
                      Prioritas
                    </span>
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) =>
                        showInfo(e, 'Bank Muamalat adalah metode pembayaran bank yang diprioritaskan dan diverifikasi otomatis.')
                      }
                      className="inline-flex items-center"
                    >
                      <HelpQuestionIcon className="w-[14px] h-[14px]" />
                    </span>
                  </span>
                  <span className="block text-[12.5px] text-[#26AA99] mt-0.5">
                    Direkomendasikan · Cek Otomatis
                  </span>
                </span>
              </span>
              <span className="flex items-center gap-2 shrink-0">
                {selectedId === 'bank_muamalat' && (
                  <span className="w-[18px] h-[18px] rounded-full bg-[#EE4D2D] flex items-center justify-center">
                    <Check className="w-[11px] h-[11px] text-white" strokeWidth={3} />
                  </span>
                )}
              </span>
            </button>

            {/* 2. ShopeePay */}
            <button
              type="button"
              aria-disabled="true"
              onClick={() =>
                setInfoTip('ShopeePay tidak dapat dipilih. Silakan gunakan Bank Muamalat.')
              }
              className="w-full px-4 py-3.5 flex items-center justify-between text-left bg-[#FAFAFA] cursor-not-allowed"
            >
              <span className="flex items-start gap-3.5">
                <span className="w-[26px] flex items-center justify-center shrink-0 mt-0.5 opacity-50">
                  <ShopeePayMethodIcon />
                </span>
                <span>
                  <span className="block text-[14px] text-[#AAAAAA]">ShopeePay</span>
                  <span className="block text-[11.5px] text-[#B0B0B0] mt-0.5">Tidak tersedia</span>
                </span>
              </span>
              <ChevronDown className="w-[18px] h-[18px] text-[#CCCCCC]" strokeWidth={1.7} />
            </button>

            {/* 3. Bank Transfer */}
            <div>
              <button
                type="button"
                onClick={() => {
                  toggleExpand('bank_transfer');
                }}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left active:bg-[#FAFAFA]"
              >
                <span className="flex items-center gap-3.5">
                  <span className="w-[26px] flex items-center justify-center shrink-0">
                    <BankTransferMethodIcon />
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-[14px] text-[#222222]">Bank Transfer</span>
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) =>
                        showInfo(e, 'Hanya Bank Muamalat yang tersedia untuk pembayaran transfer bank.')
                      }
                      className="inline-flex items-center"
                    >
                      <HelpQuestionIcon className="w-[14px] h-[14px]" />
                    </span>
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  {selectedId === 'bank_transfer' && (
                    <span className="w-[18px] h-[18px] rounded-full bg-[#EE4D2D] flex items-center justify-center">
                      <Check className="w-[11px] h-[11px] text-white" strokeWidth={3} />
                    </span>
                  )}
                  {expandedGroup === 'bank_transfer' ? (
                    <ChevronUp className="w-[18px] h-[18px] text-[#888888]" strokeWidth={1.7} />
                  ) : (
                    <ChevronDown className="w-[18px] h-[18px] text-[#888888]" strokeWidth={1.7} />
                  )}
                </span>
              </button>
              {expandedGroup === 'bank_transfer' && (
                <div className="bg-[#FAFAFA] pl-[54px] pr-4 py-2.5 space-y-2 border-t border-[#F2F2F2]">
                  {BANK_OPTIONS.map((bank) => {
                    const isSelected = selectedId === 'bank_transfer' && selectedBank === bank.name;
                    return (
                      <button
                        key={bank.name}
                        type="button"
                        onClick={() => {
                          if (!bank.available) {
                            setInfoTip('Pembayaran bank lain tidak tersedia. Hanya Bank Muamalat yang dapat dipilih.');
                            return;
                          }
                          setInfoTip(null);
                          setSelectedId('bank_transfer');
                          setSelectedBank(bank.name);
                        }}
                        className={`w-full flex items-center justify-between py-1 text-[13px] ${
                          bank.available
                            ? 'text-[#222222] font-medium'
                            : 'text-[#AAAAAA] cursor-not-allowed'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{bank.name}</span>
                          {!bank.available && (
                            <span className="text-[11px] text-[#AAAAAA] font-normal">Tidak tersedia</span>
                          )}
                        </span>
                        <span
                          className={`w-[16px] h-[16px] rounded-full border flex items-center justify-center ${
                            !bank.available
                              ? 'border-[#E0E0E0] bg-[#F2F2F2]'
                              : isSelected
                              ? 'border-[#EE4D2D] bg-[#EE4D2D]'
                              : 'border-[#CCCCCC] bg-white'
                          }`}
                        >
                          {bank.available && isSelected && (
                            <Check className="w-[10px] h-[10px] text-white" strokeWidth={3} />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 4. Kartu Kredit / Debit */}
            <div>
              <button
                type="button"
                onClick={() => {
                  setSelectedId('credit_card');
                  toggleExpand('credit_card');
                }}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left active:bg-[#FAFAFA]"
              >
                <span className="flex items-center gap-3.5">
                  <span className="w-[26px] flex items-center justify-center shrink-0">
                    <CreditCardMethodIcon />
                  </span>
                  <span className="text-[14px] text-[#222222]">Kartu Kredit / Debit</span>
                </span>
                <span className="flex items-center gap-2">
                  {selectedId === 'credit_card' && (
                    <span className="w-[18px] h-[18px] rounded-full bg-[#EE4D2D] flex items-center justify-center">
                      <Check className="w-[11px] h-[11px] text-white" strokeWidth={3} />
                    </span>
                  )}
                  {expandedGroup === 'credit_card' ? (
                    <ChevronUp className="w-[18px] h-[18px] text-[#888888]" strokeWidth={1.7} />
                  ) : (
                    <ChevronDown className="w-[18px] h-[18px] text-[#888888]" strokeWidth={1.7} />
                  )}
                </span>
              </button>
              {expandedGroup === 'credit_card' && (
                <div className="bg-[#FAFAFA] pl-[54px] pr-4 py-2.5 text-[12.5px] text-[#666666] border-t border-[#F2F2F2]">
                  Visa, Mastercard, dan JCB diterima.
                </div>
              )}
            </div>

            {/* 5. (COD) Cek dulu (Tidak Tersedia) */}
            <button
              type="button"
              aria-disabled="true"
              onClick={() => setInfoTip('Pembayaran (COD) Cek dulu saat ini tidak tersedia.')}
              className="w-full px-4 py-3.5 flex items-center justify-between text-left bg-[#FAFAFA] cursor-not-allowed"
            >
              <span className="flex items-start gap-3.5">
                <span className="w-[26px] flex items-center justify-center shrink-0 mt-0.5">
                  <CashOnDeliveryMethodIcon disabled />
                </span>
                <span>
                  <span className="block text-[14px] text-[#AAAAAA]">(COD) Cek dulu</span>
                  <span className="block text-[11.5px] text-[#B0B0B0] mt-0.5">Tidak tersedia</span>
                </span>
              </span>
            </button>

            {/* 6. Cicilan Kartu Kredit */}
            <button
              type="button"
              onClick={() => setSelectedId('credit_installment')}
              className="w-full px-4 py-3.5 flex items-center justify-between text-left active:bg-[#FAFAFA]"
            >
              <span className="flex items-center gap-3.5">
                <span className="w-[26px] flex items-center justify-center shrink-0">
                  <CreditInstallmentMethodIcon />
                </span>
                <span className="text-[14px] text-[#222222]">Cicilan Kartu Kredit</span>
              </span>
              <span className="flex items-center gap-2">
                {selectedId === 'credit_installment' && (
                  <span className="w-[18px] h-[18px] rounded-full bg-[#EE4D2D] flex items-center justify-center">
                    <Check className="w-[11px] h-[11px] text-white" strokeWidth={3} />
                  </span>
                )}
                <ChevronRight className="w-[18px] h-[18px] text-[#888888]" strokeWidth={1.7} />
              </span>
            </button>

            {/* 7. Alfamart */}
            <button
              type="button"
              onClick={() => setSelectedId('alfamart')}
              className="w-full px-4 py-3.5 flex items-center justify-between text-left active:bg-[#FAFAFA]"
            >
              <span className="flex items-center gap-3.5">
                <span className="w-[26px] flex items-center justify-center shrink-0">
                  <AlfamartMethodIcon />
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[14px] text-[#222222]">Alfamart</span>
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => showInfo(e, 'Bayar tunai di gerai Alfamart / Alfamidi terdekat.')}
                    className="inline-flex items-center"
                  >
                    <HelpQuestionIcon className="w-[14px] h-[14px]" />
                  </span>
                </span>
              </span>
              {selectedId === 'alfamart' && (
                <span className="w-[18px] h-[18px] rounded-full bg-[#EE4D2D] flex items-center justify-center">
                  <Check className="w-[11px] h-[11px] text-white" strokeWidth={3} />
                </span>
              )}
            </button>

            {/* 8. Indomaret / i.Saku */}
            <button
              type="button"
              onClick={() => setSelectedId('indomaret')}
              className="w-full px-4 py-3.5 flex items-center justify-between text-left active:bg-[#FAFAFA]"
            >
              <span className="flex items-center gap-3.5">
                <span className="w-[26px] flex items-center justify-center shrink-0">
                  <IndomaretMethodIcon />
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[14px] text-[#222222]">Indomaret / i.Saku</span>
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => showInfo(e, 'Bayar di kasir Indomaret atau melalui aplikasi i.Saku.')}
                    className="inline-flex items-center"
                  >
                    <HelpQuestionIcon className="w-[14px] h-[14px]" />
                  </span>
                </span>
              </span>
              {selectedId === 'indomaret' && (
                <span className="w-[18px] h-[18px] rounded-full bg-[#EE4D2D] flex items-center justify-center">
                  <Check className="w-[11px] h-[11px] text-white" strokeWidth={3} />
                </span>
              )}
            </button>

            {/* 9. BCA OneKlik (Tidak dapat dipilih, hanya Bank Muamalat) */}
            <button
              type="button"
              aria-disabled="true"
              onClick={() =>
                setInfoTip('Pembayaran bank lain tidak tersedia. Silakan pilih Bank Muamalat.')
              }
              className="w-full px-4 py-3.5 flex items-center justify-between text-left bg-[#FAFAFA] cursor-not-allowed"
            >
              <span className="flex items-start gap-3.5">
                <span className="w-[26px] flex items-center justify-center shrink-0 mt-0.5">
                  <BcaOneKlikMethodIcon disabled />
                </span>
                <span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-[14px] text-[#AAAAAA]">BCA OneKlik</span>
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => showInfo(e, 'Tidak tersedia. Saat ini hanya Bank Muamalat yang dapat dipilih.')}
                      className="inline-flex items-center"
                    >
                      <HelpQuestionIcon className="w-[14px] h-[14px]" />
                    </span>
                  </span>
                  <span className="block text-[12px] text-[#B0B0B0] mt-0.5">
                    Direct Debit · Tidak tersedia
                  </span>
                </span>
              </span>
              <ChevronDown className="w-[18px] h-[18px] text-[#CCCCCC]" strokeWidth={1.7} />
            </button>

            {/* 10. BRI Direct Debit (Tidak dapat dipilih, hanya Bank Muamalat) */}
            <button
              type="button"
              aria-disabled="true"
              onClick={() =>
                setInfoTip('Pembayaran bank lain tidak tersedia. Silakan pilih Bank Muamalat.')
              }
              className="w-full px-4 py-3.5 flex items-center justify-between text-left bg-[#FAFAFA] cursor-not-allowed"
            >
              <span className="flex items-start gap-3.5">
                <span className="w-[26px] flex items-center justify-center shrink-0 mt-0.5">
                  <BriDirectDebitMethodIcon disabled />
                </span>
                <span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-[14px] text-[#AAAAAA]">BRI Direct Debit</span>
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => showInfo(e, 'Tidak tersedia. Saat ini hanya Bank Muamalat yang dapat dipilih.')}
                      className="inline-flex items-center"
                    >
                      <HelpQuestionIcon className="w-[14px] h-[14px]" />
                    </span>
                  </span>
                  <span className="block text-[12px] text-[#B0B0B0] mt-0.5">
                    Direct Debit · Tidak tersedia
                  </span>
                </span>
              </span>
              <ChevronDown className="w-[18px] h-[18px] text-[#CCCCCC]" strokeWidth={1.7} />
            </button>

            {/* 11. Kredivo */}
            <button
              type="button"
              onClick={() => setSelectedId('kredivo')}
              className="w-full px-4 py-3.5 flex items-center justify-between text-left active:bg-[#FAFAFA]"
            >
              <span className="flex items-center gap-3.5">
                <span className="w-[26px] flex items-center justify-center shrink-0">
                  <KredivoMethodIcon />
                </span>
                <span className="text-[14px] text-[#222222]">Kredivo</span>
              </span>
              {selectedId === 'kredivo' && (
                <span className="w-[18px] h-[18px] rounded-full bg-[#EE4D2D] flex items-center justify-center">
                  <Check className="w-[11px] h-[11px] text-white" strokeWidth={3} />
                </span>
              )}
            </button>
          </div>
        </main>

        {/* Bottom Sticky KONFIRMASI Button */}
        <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-[#EFEFEF] px-3.5 py-2.5 z-30">
          <button
            type="button"
            onClick={() => onConfirm(buildConfirmedPayment())}
            className="w-full h-[42px] bg-[#EE4D2D] hover:bg-[#DC3D1E] active:scale-[0.99] transition-all text-white text-[14.5px] font-medium tracking-[0.03em] rounded-[3px] uppercase"
          >
            KONFIRMASI
          </button>
        </footer>
      </div>
    </div>
  );
}
