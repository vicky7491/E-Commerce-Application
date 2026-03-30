import { useToast } from "@/components/ui/use-toast"  // ← your existing hook, unchanged
import React from "react"
import { useState,useEffect } from "react"


const progressStyle = `
  @keyframes shrink {
    from { width: 100%; }
    to   { width: 0%; }
  }
`
// ── variant map: bridges old shadcn API → new visual system ──
const VARIANT_MAP = {
  default:     "default",
  destructive: "error",    // ← toast({ variant: "destructive" }) still works
  success:     "success",
  warning:     "warning",
  info:        "info",
}

const COLORS = {
  success: "#22c55e",
  error:   "#ef4444",
  warning: "#f59e0b",
  info:    "#3b82f6",
  default: "#a1a1aa",
}

const ICONS = {
  success: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5 8.5L7 10.5L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  error: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 6L10 10M10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  warning: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path d="M8 2.5L14 13H2L8 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M8 6.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="8" cy="11" r=".75" fill="currentColor"/>
    </svg>
  ),
  info: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 7.5V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="8" cy="5.25" r=".75" fill="currentColor"/>
    </svg>
  ),
  default: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 7.5V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="8" cy="5.25" r=".75" fill="currentColor"/>
    </svg>
  ),
}

// ── Single toast item ──────────────────────────────────────────
function ToastItem({ t, onDismiss }) {
  const [visible, setVisible] = React.useState(false)
   const DURATION = t.duration ?? 4000

  const variant = VARIANT_MAP[t.variant] || "default"
  const color   = COLORS[variant]

  React.useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
  }, [])

  React.useEffect(() => {
    if (DURATION === Infinity) return
    const timer = setTimeout(() => onDismiss(t.id), DURATION)
    return () => clearTimeout(timer)
  }, [t.id, DURATION])

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        transform:  visible && t.open ? "translateY(0) scale(1)"    : "translateY(16px) scale(0.93)",
        opacity:    visible && t.open ? 1 : 0,
        transition: "transform 0.35s cubic-bezier(0.21,1.02,0.73,1), opacity 0.25s ease",
        marginBottom: "8px",
      }}
    >
      <div style={{
        display:       "flex",
        alignItems:    "flex-start",
        gap:           "10px",
        padding:       "12px 13px",
        background:    "rgba(18,18,20,0.93)",
        backdropFilter:"blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border:        "1px solid rgba(255,255,255,0.09)",
        borderRadius:  "13px",
        boxShadow:     "0 8px 24px -4px rgba(0,0,0,0.45), 0 2px 6px -2px rgba(0,0,0,0.3)",
        minWidth:      "300px",
        maxWidth:      "400px",
        position:      "relative",
        overflow:      "hidden",
      }}>

        {/* Icon */}
        <span style={{ color, flexShrink: 0, marginTop: "1px", display: "flex" }}>
          {ICONS[variant]}
        </span>

        {/* Content — maps directly from old shadcn props */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {t.title && (
            <p style={{
              margin: 0, fontSize: "13px", fontWeight: 600,
              color: "#f4f4f5", lineHeight: 1.35, letterSpacing: "-0.01em",
              fontFamily: "'SF Pro Display', system-ui, sans-serif",
            }}>
              {t.title}
            </p>
          )}
          {t.description && (
            <p style={{
              margin: t.title ? "2px 0 0" : 0,
              fontSize: "12.5px",
              color: t.title ? "#71717a" : "#d4d4d8",
              lineHeight: 1.45,
              fontFamily: "'SF Pro Text', system-ui, sans-serif",
              fontWeight: t.title ? 400 : 500,
            }}>
              {t.description}
            </p>
          )}

          {/* action button — shadcn passes { altText, onClick } */}
          {t.action && (
            <button
              onClick={t.action.onClick}
              style={{
                marginTop: "7px", padding: "3px 9px", fontSize: "11.5px",
                fontWeight: 600, color, background: "transparent",
                border: `1px solid ${color}33`, borderRadius: "5px",
                cursor: "pointer", letterSpacing: "-0.01em",
              }}
            >
              {t.action.altText}
            </button>
          )}
        </div>

        {/* Close */}
        <button
          onClick={() => onDismiss(t.id)}
          aria-label="Close"
          style={{
            flexShrink: 0, display: "flex", alignItems: "center",
            justifyContent: "center", width: "18px", height: "18px",
            background: "transparent", border: "none", cursor: "pointer",
            color: "#52525b", borderRadius: "4px", padding: 0,
            transition: "color 0.12s, background 0.12s",
          }}
          onMouseEnter={e => { e.currentTarget.style.color="#a1a1aa"; e.currentTarget.style.background="rgba(255,255,255,0.07)" }}
          onMouseLeave={e => { e.currentTarget.style.color="#52525b"; e.currentTarget.style.background="transparent" }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Progress bar */}
        
{DURATION !== Infinity && (
  <div style={{
    position:        "absolute",
    bottom:          0,
    left:            0,
    height:          "2px",
    width:           "100%",                    // CSS handles the shrink
    background:      `linear-gradient(90deg, ${color}88, ${color})`,
    borderRadius:    "0 0 0 13px",
    animation:       `shrink ${DURATION}ms linear forwards`,  // ← pure CSS
    animationPlayState: t.open ? "running" : "paused",
  }} />
)}
      </div>
    </div>
  )
}

// ── Toaster — drop once in your root layout ────────────────────
export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <>
    <style>{progressStyle}</style> 
    <div style={{
      position:  "fixed",
      bottom:    "24px",
      left:      "50%",
      transform: "translateX(-50%)",
      zIndex:    9999,
      display:   "flex",
      flexDirection: "column-reverse",
      alignItems: "center",
      pointerEvents: "none",
      width: "max-content",
      maxWidth: "calc(100vw - 32px)",
    }}>
      {toasts.map(t => (
        <div key={t.id} style={{ pointerEvents: "all" }}>
          <ToastItem t={t} onDismiss={dismiss} />
        </div>
      ))}
    </div>
    </>
  )
}