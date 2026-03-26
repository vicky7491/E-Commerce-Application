import React, { useState, useEffect, useRef } from 'react';
import {
  Calendar, Clock, User, Mail, Phone, MapPin,
  MessageSquare, Send, CheckCircle, ChevronRight,
  ChevronLeft, Sparkles, ChevronDown
} from 'lucide-react';
import axios from "axios";
import { API_BASE } from "@/api/base";

/* ════════════════════════════════════════════════════
   FLOATING LABEL INPUT  — defined OUTSIDE main component
   so it never remounts on parent re-render (fixes focus bug)
════════════════════════════════════════════════════ */
const FloatingInput = ({
  label, id, type = 'text', value, onChange,
  onKeyPress, onInput, maxLength, required, placeholder, icon: Icon, error
}) => {
  const [focused, setFocused] = useState(false);
  const lifted = focused || !!value;

  return (
    <div className="space-y-1">
      <div className={`relative flex items-center rounded-xl border transition-all duration-200 bg-white
        ${error
          ? 'border-red-300 shadow-[0_0_0_3px_rgba(252,165,165,0.2)]'
          : focused
            ? 'border-rose-400 shadow-[0_0_0_3px_rgba(251,113,133,0.15)]'
            : 'border-slate-200 hover:border-slate-300'
        }`}>
        {Icon && (
          <span className={`absolute left-3.5 pointer-events-none transition-colors duration-200 z-10
            ${focused ? 'text-rose-400' : error ? 'text-red-400' : 'text-slate-400'}`}>
            <Icon size={15} />
          </span>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
          onInput={onInput}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          maxLength={maxLength}
          autoComplete="off"
          placeholder={lifted ? (placeholder || '') : ''}
          className={`peer w-full bg-transparent pt-5 pb-2 text-sm text-slate-800
            placeholder-slate-300 focus:outline-none rounded-xl
            ${Icon ? 'pl-9 pr-4' : 'px-4'}`}
        />
        <label
          htmlFor={id}
          className={`absolute pointer-events-none font-medium transition-all duration-200 origin-left
            ${Icon ? 'left-9' : 'left-4'}
            ${lifted
              ? 'top-[7px] text-[10px] tracking-wide ' + (error ? 'text-red-400' : focused ? 'text-rose-500' : 'text-slate-400')
              : 'top-1/2 -translate-y-1/2 text-sm text-slate-400'
            }`}
        >
          {label}{required && <span className="text-rose-400 ml-0.5">*</span>}
        </label>
      </div>
      {error && <p className="text-xs text-red-400 font-medium ml-1">{error}</p>}
    </div>
  );
};

/* ════════════════════════════════════════════════════
   CUSTOM CALENDAR  — modern dropdown date picker
════════════════════════════════════════════════════ */
const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];
const DAYS   = ['Su','Mo','Tu','We','Th','Fr','Sa'];

const CustomCalendar = ({ value, onChange, error }) => {
  const today = new Date(); today.setHours(0,0,0,0);
  const initDate = value ? new Date(value + 'T00:00:00') : today;
  const [view, setView] = useState({ year: initDate.getFullYear(), month: initDate.getMonth() });
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const fn = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const firstDay    = new Date(view.year, view.month, 1).getDay();
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();

  const prevMonth = () => setView(v => ({
    year:  v.month === 0 ? v.year - 1 : v.year,
    month: v.month === 0 ? 11 : v.month - 1,
  }));
  const nextMonth = () => setView(v => ({
    year:  v.month === 11 ? v.year + 1 : v.year,
    month: v.month === 11 ? 0 : v.month + 1,
  }));

  const select = (day) => {
    const d = new Date(view.year, view.month, day);
    if (d < today) return;
    const iso = `${view.year}-${String(view.month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    onChange(iso);
    setOpen(false);
  };

  const displayValue = value
    ? new Date(value + 'T00:00:00').toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })
    : null;

  const selDay   = value ? parseInt(value.split('-')[2]) : null;
  const selMonth = value ? parseInt(value.split('-')[1]) - 1 : null;
  const selYear  = value ? parseInt(value.split('-')[0]) : null;

  return (
    <div className="space-y-1 relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border text-sm transition-all duration-200 bg-white text-left
          ${error
            ? 'border-red-300 shadow-[0_0_0_3px_rgba(252,165,165,0.2)]'
            : open
              ? 'border-rose-400 shadow-[0_0_0_3px_rgba(251,113,133,0.15)]'
              : 'border-slate-200 hover:border-slate-300'
          }`}
      >
        <Calendar size={15} className={open ? 'text-rose-400' : 'text-slate-400'} />
        <span className={`flex-1 ${displayValue ? 'text-slate-800 font-semibold' : 'text-slate-400'}`}>
          {displayValue || 'Pick a date'}
        </span>
        <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-[calc(100%+8px)] left-0 z-50 w-72 bg-white rounded-2xl border border-slate-100 shadow-2xl shadow-slate-200/80 p-4">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-4">
            <button type="button" onClick={prevMonth}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-500 transition-colors">
              <ChevronLeft size={16}/>
            </button>
            <span className="text-sm font-bold text-slate-700">{MONTHS[view.month]} {view.year}</span>
            <button type="button" onClick={nextMonth}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-500 transition-colors">
              <ChevronRight size={16}/>
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-1">
            {DAYS.map(d => (
              <div key={d} className="text-center text-[10px] font-extrabold text-slate-300 uppercase py-1">{d}</div>
            ))}
          </div>

          {/* Date grid */}
          <div className="grid grid-cols-7 gap-y-1">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day    = i + 1;
              const d      = new Date(view.year, view.month, day);
              const isPast = d < today;
              const isSel  = selDay === day && selMonth === view.month && selYear === view.year;
              const isToday = d.getTime() === today.getTime();
              return (
                <button key={day} type="button" disabled={isPast} onClick={() => select(day)}
                  className={`h-9 w-full flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-150
                    ${isPast
                      ? 'text-slate-200 cursor-not-allowed'
                      : isSel
                        ? 'bg-gradient-to-br from-rose-500 to-orange-400 text-white shadow-md shadow-rose-200 scale-105'
                        : isToday
                          ? 'border-2 border-rose-300 text-rose-500 hover:bg-rose-50'
                          : 'text-slate-700 hover:bg-rose-50 hover:text-rose-500'
                    }`}>
                  {day}
                </button>
              );
            })}
          </div>

          {/* Today shortcut */}
          <div className="mt-3 pt-3 border-t border-slate-100">
            <button type="button"
              onClick={() => { onChange(today.toISOString().split('T')[0]); setOpen(false); }}
              className="w-full text-xs text-rose-500 hover:text-rose-600 font-bold py-1.5 rounded-lg hover:bg-rose-50 transition-colors">
              Select Today
            </button>
          </div>
        </div>
      )}
      {error && <p className="text-xs text-red-400 font-medium ml-1">{error}</p>}
    </div>
  );
};

/* ════════════════════════════════════════════════════
   STEP PROGRESS BAR
════════════════════════════════════════════════════ */
const StepBar = ({ current, total, labels }) => (
  <div className="px-8 pb-6 pt-2">
    <div className="flex items-center justify-between relative">
      <div className="absolute left-0 right-0 top-[14px] h-px bg-slate-100 z-0"/>
      <div className="absolute left-0 top-[14px] h-px bg-gradient-to-r from-rose-400 to-orange-400 z-0 transition-all duration-500"
        style={{ width: `${((current - 1) / (total - 1)) * 100}%` }}/>
      {Array.from({ length: total }).map((_, i) => {
        const done   = i + 1 < current;
        const active = i + 1 === current;
        return (
          <div key={i} className="relative z-10 flex flex-col items-center gap-1.5">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
              ${done   ? 'bg-gradient-to-br from-rose-400 to-orange-400 text-white shadow-md shadow-rose-200'
              : active ? 'bg-white border-2 border-rose-400 text-rose-500 shadow-md shadow-rose-100'
              :          'bg-white border-2 border-slate-200 text-slate-300'}`}>
              {done ? <CheckCircle size={13}/> : i + 1}
            </div>
            <span className={`text-[10px] font-bold tracking-wide whitespace-nowrap
              ${active ? 'text-rose-500' : done ? 'text-slate-500' : 'text-slate-300'}`}>
              {labels[i]}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);

/* ════════════════════════════════════════════════════
   CONCEPT CARD
════════════════════════════════════════════════════ */
const ConceptCard = ({ concept, selected, onSelect }) => (
  <button type="button" onClick={() => onSelect(concept.value)}
    className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 group
      ${selected
        ? 'border-rose-400 bg-gradient-to-r from-rose-50 to-orange-50 shadow-md shadow-rose-100'
        : 'border-slate-100 bg-white hover:border-rose-200 hover:shadow-sm'}`}>
    <div className="flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-all
        ${selected ? 'bg-white shadow-sm scale-110' : 'bg-slate-50'}`}>
        {concept.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`font-bold text-sm ${selected ? 'text-rose-600' : 'text-slate-700'}`}>{concept.value}</p>
        <p className="text-xs text-slate-400 mt-0.5">{concept.description}</p>
      </div>
      <div className={`w-5 h-5 rounded-full flex-shrink-0 border-2 flex items-center justify-center transition-all
        ${selected ? 'border-rose-400 bg-rose-400' : 'border-slate-200 group-hover:border-rose-300'}`}>
        {selected && (
          <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3">
            <path d="M3.5 8.5l3 3 6-7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
    </div>
  </button>
);

/* ════════════════════════════════════════════════════
   TIME SLOT
════════════════════════════════════════════════════ */
const TimeSlot = ({ slot, selected, onSelect }) => (
  <button type="button" onClick={() => onSelect(slot.value)}
    className={`p-3.5 rounded-xl border-2 text-left transition-all duration-200 group
      ${selected
        ? 'border-rose-400 bg-gradient-to-br from-rose-50 to-orange-50 shadow-sm'
        : 'border-slate-100 bg-white hover:border-rose-200 hover:shadow-sm'}`}>
    <div className="flex items-center gap-3">
      <span className={`text-xl transition-transform duration-200 ${selected ? 'scale-125' : 'group-hover:scale-110'}`}>
        {slot.icon}
      </span>
      <div>
        <p className={`text-sm font-bold ${selected ? 'text-rose-600' : 'text-slate-700'}`}>{slot.label}</p>
        <p className="text-xs text-slate-400">{slot.time}</p>
      </div>
    </div>
  </button>
);

/* ════════════════════════════════════════════════════
   SUCCESS SCREEN
════════════════════════════════════════════════════ */
const SuccessScreen = ({ data, onReset }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCount(c => { if (c >= 100) { clearInterval(t); return 100; } return c + 3; }), 15);
    return () => clearInterval(t);
  }, []);

  const timeLabels = {
    "early-morning": "Early Morning · 6AM–9AM",
    "morning":       "Morning · 9AM–12PM",
    "afternoon":     "Afternoon · 12PM–4PM",
    "evening":       "Evening · 4PM–7PM",
  };
  const conceptIcons = {
    "Baby Concept": "👶", "Parents / Aashirwad Concept": "🙏",
    "Couples Concept": "💕", "Family / Group": "👨‍👩‍👧‍👦",
  };
  const rows = [
    { label:'Session',  value:`${conceptIcons[data.concept] || ''} ${data.concept}` },
    { label:'Date',     value: data.date ? new Date(data.date+'T00:00:00').toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'long',year:'numeric'}) : '—' },
    { label:'Time',     value: timeLabels[data.time] || data.time },
    { label:'Location', value: data.location },
    { label:'Email',    value: data.email },
  ];

  return (
    <div className="relative overflow-hidden">
      {[...Array(12)].map((_,i) => (
        <div key={i} className="absolute rounded-full opacity-40 animate-pulse"
          style={{
            width:`${8+(i%4)*6}px`, height:`${8+(i%4)*6}px`,
            left:`${8+i*7.5}%`, top:`${4+(i%3)*8}%`,
            background:['#fda4af','#fdba74','#fde68a','#86efac','#93c5fd','#c4b5fd'][i%6],
            animationDelay:`${i*0.15}s`, animationDuration:`${1.5+(i%3)*0.5}s`,
          }}/>
      ))}
      <div className="relative z-10 px-8 py-10 flex flex-col items-center text-center">
        {/* Animated ring */}
        <div className="relative w-24 h-24 mb-5">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
            <circle cx="48" cy="48" r="42" fill="none" stroke="#fee2e2" strokeWidth="5"/>
            <circle cx="48" cy="48" r="42" fill="none" stroke="url(#sg)" strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={`${2*Math.PI*42}`}
              strokeDashoffset={`${2*Math.PI*42*(1-count/100)}`}
              style={{transition:'stroke-dashoffset 0.04s linear'}}/>
            <defs>
              <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fb7185"/>
                <stop offset="100%" stopColor="#f97316"/>
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-50 to-orange-50 flex items-center justify-center shadow-inner">
              <CheckCircle className="w-7 h-7 text-rose-500" strokeWidth={2.5}/>
            </div>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/> Request Received
        </span>

        <h2 className="text-[1.6rem] font-extrabold text-slate-800 leading-tight mb-2">
          You're all set{data.name ? `, ${data.name.split(' ')[0]}` : ''}! 🎉
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed max-w-[260px] mb-7">
          We'll call or text you within <strong className="text-slate-700">24 hours</strong> to confirm your session.
        </p>

        <div className="w-full bg-slate-50/80 border border-slate-100 rounded-2xl p-5 text-left mb-6">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">Booking Summary</p>
          <div className="space-y-2.5">
            {rows.map(r => (
              <div key={r.label} className="flex items-start justify-between gap-3">
                <span className="text-xs text-slate-400 font-semibold shrink-0 w-16">{r.label}</span>
                <span className="text-xs text-slate-700 font-bold text-right leading-relaxed">{r.value}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-400 mb-6">
          Confirmation sent to <span className="font-semibold text-slate-600">{data.email}</span>
        </p>
        <button onClick={onReset}
          className="text-sm text-rose-500 hover:text-rose-600 font-bold underline underline-offset-4 transition-colors">
          Book another session →
        </button>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════
   CONSTANTS  (outside component — stable references)
════════════════════════════════════════════════════ */
const CONCEPTS = [
  { value:"Baby Concept",                icon:"👶", description:"Precious moments with your little one" },
  { value:"Parents / Aashirwad Concept", icon:"🙏", description:"Blessings and family traditions" },
  { value:"Couples Concept",             icon:"💕", description:"Romantic and intimate sessions" },
  { value:"Family / Group",              icon:"👨‍👩‍👧‍👦", description:"Everyone together, memories forever" },
];
const TIME_SLOTS = [
  { value:"early-morning", label:"Early Morning", time:"6AM–9AM",   icon:"🌅" },
  { value:"morning",       label:"Morning",       time:"9AM–12PM",  icon:"☀️" },
  { value:"afternoon",     label:"Afternoon",     time:"12PM–4PM",  icon:"🌤️" },
  { value:"evening",       label:"Evening",       time:"4PM–7PM",   icon:"🌇" },
];
const STEP_LABELS = ['Your Info', 'Session', 'Schedule'];

/* ════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════ */
const BookingForm = ({ formId }) => {
  const [step,            setStep]            = useState(1);
  const [sliding,         setSliding]         = useState(false);
  const [slideDir,        setSlideDir]        = useState('forward');
  const [selectedConcept, setSelectedConcept] = useState('');
  const [preferredTime,   setPreferredTime]   = useState('');
  const [date,            setDate]            = useState('');
  const [formData,        setFormData]        = useState({ name:'', phone:'', email:'', location:'', comments:'' });
  const [errors,          setErrors]          = useState({});
  const [isSubmitting,    setIsSubmitting]    = useState(false);
  const [isSubmitted,     setIsSubmitted]     = useState(false);
  const [submittedData,   setSubmittedData]   = useState(null);

  const patch = (key) => (e) => setFormData(f => ({ ...f, [key]: e.target.value }));

  const validate = (s) => {
    const e = {};
    if (s === 1) {
      if (!formData.name.trim())                                      e.name     = 'Name is required';
      if (!formData.phone || formData.phone.length < 10)             e.phone    = 'Enter a valid 10-digit number';
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))  e.email    = 'Enter a valid email';
      if (!formData.location.trim())                                  e.location = 'Location is required';
    }
    if (s === 2 && !selectedConcept) e.concept = 'Please select a session type';
    if (s === 3) {
      if (!date)          e.date = 'Please pick a date';
      if (!preferredTime) e.time = 'Please select a time slot';
    }
    return e;
  };

  const goTo = (next) => {
    const errs = validate(step);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSlideDir(next > step ? 'forward' : 'back');
    setSliding(true);
    setTimeout(() => { setStep(next); setSliding(false); }, 220);
  };

  const handleSubmit = async () => {
    const errs = validate(3);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setIsSubmitting(true);
    const payload = { ...formData, concept: selectedConcept, date, time: preferredTime };

    setTimeout(() => { setIsSubmitting(false); setSubmittedData(payload); setIsSubmitted(true); }, 1400);

    if (typeof sessionStorage !== 'undefined') sessionStorage.setItem("activeForm", formId);
    try {
      await axios.post(`${API_BASE}/api/bookings/booking`, payload);
    } catch (err) {
      console.error("Booking error:", err.response?.data || err.message);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false); setSubmittedData(null); setStep(1);
    setFormData({ name:'', phone:'', email:'', location:'', comments:'' });
    setSelectedConcept(''); setDate(''); setPreferredTime(''); setErrors({});
  };

  if (isSubmitted && submittedData) return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-100/80 border border-slate-100">
      <div className="h-1 w-full bg-gradient-to-r from-rose-400 via-orange-400 to-amber-300"/>
      <SuccessScreen data={submittedData} onReset={handleReset}/>
    </div>
  );

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-100/80 border border-slate-100">
      <div className="h-1 w-full bg-gradient-to-r from-rose-400 via-orange-400 to-amber-300"/>

      {/* Header */}
      <div className="px-8 pt-7 pb-2">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles size={13} className="text-rose-400"/>
          <span className="text-[10px] font-extrabold tracking-widest text-rose-400 uppercase">Studio Booking</span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Book Your Session</h2>
        <p className="text-slate-400 text-sm mt-0.5">Just 3 quick steps — done in under 2 minutes.</p>
      </div>

      <StepBar current={step} total={3} labels={STEP_LABELS}/>

      {/* Animated content */}
      <div className="px-8 pb-8"
        style={{
          opacity:   sliding ? 0 : 1,
          transform: sliding ? (slideDir === 'forward' ? 'translateX(18px)' : 'translateX(-18px)') : 'translateX(0)',
          transition:'opacity 0.22s ease, transform 0.22s ease',
        }}>

        {/* ── STEP 1 ── */}
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-xs text-slate-400 font-semibold mb-4">Step 1 of 3 · Your contact details</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FloatingInput id="name" label="Full Name" icon={User} required
                value={formData.name} error={errors.name} onChange={patch('name')}
                onKeyPress={e => { if (!/[A-Za-z\s]/.test(e.key)) e.preventDefault(); }}/>
              <FloatingInput id="phone" label="Phone Number" type="tel" icon={Phone}
                maxLength={10} required placeholder="10-digit mobile"
                value={formData.phone} error={errors.phone}
                onInput={e => { e.target.value = e.target.value.replace(/\D/g,''); setFormData(f => ({...f, phone:e.target.value})); }}
                onChange={patch('phone')}/>
              <FloatingInput id="email" label="Email Address" type="email" icon={Mail} required
                placeholder="you@example.com"
                value={formData.email} error={errors.email} onChange={patch('email')}/>
              <FloatingInput id="location" label="Your City / Location" icon={MapPin} required
                placeholder="e.g. Mumbai, Delhi"
                value={formData.location} error={errors.location} onChange={patch('location')}/>
            </div>
          </div>
        )}

        {/* ── STEP 2 ── */}
        {step === 2 && (
          <div className="space-y-3">
            <p className="text-xs text-slate-400 font-semibold mb-4">Step 2 of 3 · Choose your session type</p>
            {CONCEPTS.map(c => (
              <ConceptCard key={c.value} concept={c}
                selected={selectedConcept === c.value}
                onSelect={v => { setSelectedConcept(v); setErrors(p => ({...p, concept:''})); }}/>
            ))}
            {errors.concept && <p className="text-xs text-red-400 font-medium ml-1 mt-1">{errors.concept}</p>}
          </div>
        )}

        {/* ── STEP 3 ── */}
        {step === 3 && (
          <div className="space-y-6">
            <p className="text-xs text-slate-400 font-semibold">Step 3 of 3 · When works for you?</p>

            <div>
              <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-2">
                Preferred Date <span className="text-rose-400">*</span>
              </label>
              <CustomCalendar value={date}
                onChange={v => { setDate(v); setErrors(p => ({...p, date:''})); }}
                error={errors.date}/>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-2">
                Preferred Time <span className="text-rose-400">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {TIME_SLOTS.map(s => (
                  <TimeSlot key={s.value} slot={s} selected={preferredTime === s.value}
                    onSelect={v => { setPreferredTime(v); setErrors(p => ({...p, time:''})); }}/>
                ))}
              </div>
              {errors.time && <p className="text-xs text-red-400 font-medium ml-1 mt-1">{errors.time}</p>}
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-2">
                Additional Notes <span className="font-normal text-slate-300 normal-case tracking-normal">(optional)</span>
              </label>
              <div className="relative border border-slate-200 rounded-xl focus-within:border-rose-400 focus-within:shadow-[0_0_0_3px_rgba(251,113,133,0.15)] transition-all duration-200 bg-white">
                <MessageSquare size={14} className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none"/>
                <textarea rows={3} value={formData.comments} onChange={patch('comments')}
                  placeholder="Any special requests or notes…"
                  className="w-full bg-transparent pt-3 pb-3 pl-9 pr-4 text-sm text-slate-700 placeholder-slate-300 focus:outline-none resize-none rounded-xl"/>
              </div>
            </div>
          </div>
        )}

        {/* ── Navigation ── */}
        <div className={`flex mt-8 gap-3 ${step > 1 ? 'justify-between' : 'justify-end'}`}>
          {step > 1 && (
            <button type="button" onClick={() => goTo(step - 1)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-slate-100 text-slate-500 text-sm font-bold hover:border-slate-200 hover:bg-slate-50 transition-all duration-200">
              <ChevronLeft size={16}/> Back
            </button>
          )}
          {step < 3 ? (
            <button type="button" onClick={() => goTo(step + 1)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white text-sm font-bold shadow-lg shadow-rose-200/70 hover:shadow-rose-300/70 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
              Continue <ChevronRight size={16}/>
            </button>
          ) : (
            <button type="button"
              onClick={() => { sessionStorage?.setItem("activeForm", formId); handleSubmit(); }}
              disabled={isSubmitting}
              className={`flex items-center gap-2 px-7 py-3 rounded-xl text-white text-sm font-bold transition-all duration-200
                ${isSubmitting
                  ? 'bg-slate-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 shadow-lg shadow-rose-200/70 hover:scale-[1.02] active:scale-[0.98]'}`}>
              {isSubmitting
                ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> Submitting…</>
                : <><Send size={15}/> Confirm Booking</>}
            </button>
          )}
        </div>

        <p className="text-center text-[11px] text-slate-300 mt-5 font-medium">
          🔒 Your details are private &amp; secure · No spam, ever
        </p>
      </div>
    </div>
  );
};

export default BookingForm;