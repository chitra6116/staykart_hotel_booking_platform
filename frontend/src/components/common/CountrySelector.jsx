import React, { useState, useRef, useEffect } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { DEFAULT_COUNTRY } from '../../config/countryConfig';
import { ChevronDown, Check, Globe } from 'lucide-react';

export default function CountrySelector({ isMobile = false }) {
  const { countries = [], selectedCountry, setCountry } = useCurrency();
  const current = selectedCountry || DEFAULT_COUNTRY;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (isMobile) {
    return (
      <div className="space-y-1.5 pt-1">
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-teal-500" />
          <span>Country &amp; Currency</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {countries.map((c) => {
            const isSelected = current.code === c.code;
            return (
              <button
                key={c.code}
                type="button"
                onClick={() => setCountry(c.code)}
                className={`flex items-center gap-2 p-2 rounded-xl text-xs font-semibold border transition-all text-left ${
                  isSelected
                    ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300'
                    : 'border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="text-base">{c.flag}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate leading-tight">{c.currency}</p>
                  <p className="text-[10px] text-slate-400 truncate">{c.name}</p>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-teal-500 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select country and currency"
        aria-expanded={isOpen}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600 transition-colors shadow-sm"
      >
        <span className="text-sm">{current.flag}</span>
        <span>{current.currency}</span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-800 shadow-2xl border border-slate-200/90 dark:border-slate-700/80 py-1.5 z-50 animate-slide-up">
          <div className="px-3.5 py-2 border-b border-slate-100 dark:border-slate-700/60">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Select Regional Currency
            </p>
          </div>

          <div className="py-1">
            {countries.map((c) => {
              const isSelected = current.code === c.code;
              return (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => {
                    setCountry(c.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2 text-xs transition-colors text-left ${
                    isSelected
                      ? 'bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 font-bold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/40 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{c.flag}</span>
                    <div>
                      <p className="leading-tight">{c.name}</p>
                      <p className="text-[10px] text-slate-400">
                        {c.currency} ({c.symbol}) &bull; {c.taxName}
                      </p>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-teal-600 dark:text-teal-400" />}
                </button>
              );
            })}
          </div>

          <div className="px-3.5 py-2 border-t border-slate-100 dark:border-slate-700/60 bg-slate-50/60 dark:bg-slate-900/40 text-[10px] text-slate-400">
            Rates auto-convert tariffs with regional tax adaptations.
          </div>
        </div>
      )}
    </div>
  );
}
