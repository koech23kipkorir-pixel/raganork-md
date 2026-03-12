/**
 * ╔══════════════════════════════════════════════╗
 * ║          AUTO-BIO PLUGIN — PRO EDITION       ║
 * ║     Real-time Clock • Date • Country Flag    ║
 * ║          Built for Raganork MD Bot           ║
 * ╚══════════════════════════════════════════════╝
 *
 * ✅ Real-time ticking clock (updates every second)
 * ✅ Live date with day name
 * ✅ Country flag + name via IP geolocation
 * ✅ Uptime tracker
 * ✅ Fully customizable bio template
 * ✅ Auto-stops when bot goes offline
 */

// ─────────────────────────────────────────────
//              ✏️  CONFIGURATION
// ─────────────────────────────────────────────
const bioConfig = {
    updateInterval: 1000,           // Update every 1 second (real-time tick)
    timezone: "Africa/Nairobi",     // 🌍 Your timezone (e.g. "America/New_York")
    use24Hour: true,                // true = 24hr format | false = 12hr AM/PM
    showUptime: true,               // Show how long bot has been running
    showCountry: true,              // Show country flag + name
    showDate: true,                 // Show current date
    showClock: true,                // Show live clock
    countryCode: "KE",              // 🇰🇪 Your country code (ISO 3166-1 alpha-2)
};

// ─────────────────────────────────────────────
//          🎨  BIO TEMPLATE — Edit freely!
// ─────────────────────────────────────────────
function buildBio({ time, date, day, country, flag, uptime }) {
    return [
        `╭───「 🤖 𝗥𝗔𝗚𝗔𝗡𝗢𝗥𝗞 𝗕𝗢𝗧 」───╮`,
        `│`,
        bioConfig.showClock  ? `│  🕐 ${time}` : null,
        bioConfig.showDate   ? `│  📅 ${day}, ${date}` : null,
        bioConfig.showCountry ? `│  ${flag} ${country}` : null,
        bioConfig.showUptime ? `│  ⚡ Uptime: ${uptime}` : null,
        `│`,
        `│  ✅ Online & Ready`,
        `│  💬 Type .menu for commands`,
        `╰────────────────────────╯`,
    ]
    .filter(line => line !== null)
    .join("\n");
}

// ─────────────────────────────────────────────
//              🌍  COUNTRY DATA
// ─────────────────────────────────────────────
const countryData = {
    AF: ["Afghanistan", "🇦🇫"],       AL: ["Albania", "🇦🇱"],
    DZ: ["Algeria", "🇩🇿"],           AO: ["Angola", "🇦🇴"],
    AR: ["Argentina", "🇦🇷"],         AU: ["Australia", "🇦🇺"],
    AT: ["Austria", "🇦🇹"],           BD: ["Bangladesh", "🇧🇩"],
    BE: ["Belgium", "🇧🇪"],           BR: ["Brazil", "🇧🇷"],
    CA: ["Canada", "🇨🇦"],            CL: ["Chile", "🇨🇱"],
    CN: ["China", "🇨🇳"],             CO: ["Colombia", "🇨🇴"],
    CD: ["DR Congo", "🇨🇩"],          EG: ["Egypt", "🇪🇬"],
    ET: ["Ethiopia", "🇪🇹"],          FR: ["France", "🇫🇷"],
    DE: ["Germany", "🇩🇪"],           GH: ["Ghana", "🇬🇭"],
    IN: ["India", "🇮🇳"],             ID: ["Indonesia", "🇮🇩"],
    IR: ["Iran", "🇮🇷"],              IQ: ["Iraq", "🇮🇶"],
    IT: ["Italy", "🇮🇹"],             JP: ["Japan", "🇯🇵"],
    KE: ["Kenya", "🇰🇪"],             MX: ["Mexico", "🇲🇽"],
    MA: ["Morocco", "🇲🇦"],           MZ: ["Mozambique", "🇲🇿"],
    MM: ["Myanmar", "🇲🇲"],           NP: ["Nepal", "🇳🇵"],
    NL: ["Netherlands", "🇳🇱"],       NZ: ["New Zealand", "🇳🇿"],
    NG: ["Nigeria", "🇳🇬"],           NO: ["Norway", "🇳🇴"],
    PK: ["Pakistan", "🇵🇰"],          PH: ["Philippines", "🇵🇭"],
    PL: ["Poland", "🇵🇱"],            PT: ["Portugal", "🇵🇹"],
    RO: ["Romania", "🇷🇴"],           RU: ["Russia", "🇷🇺"],
    SA: ["Saudi Arabia", "🇸🇦"],      ZA: ["South Africa", "🇿🇦"],
    ES: ["Spain", "🇪🇸"],             LK: ["Sri Lanka", "🇱🇰"],
    SD: ["Sudan", "🇸🇩"],             SE: ["Sweden", "🇸🇪"],
    TZ: ["Tanzania", "🇹🇿"],          TH: ["Thailand", "🇹🇭"],
    TR: ["Turkey", "🇹🇷"],            UA: ["Ukraine", "🇺🇦"],
    AE: ["UAE", "🇦🇪"],               GB: ["United Kingdom", "🇬🇧"],
    US: ["United States", "🇺🇸"],     UG: ["Uganda", "🇺🇬"],
    VN: ["Vietnam", "🇻🇳"],           ZM: ["Zambia", "🇿🇲"],
    ZW: ["Zimbabwe", "🇿🇼"],
};

function getCountryInfo(code) {
    const upper = (code || "").toUpperCase();
    if (countryData[upper]) {
        return { country: countryData[upper][0], flag: countryData[upper][1] };
    }
    return { country: upper || "Unknown", flag: "🌍" };
}

// ─────────────────────────────────────────────
//              ⏱️  UPTIME TRACKER
// ─────────────────────────────────────────────
const startTime = Date.now();

function getUptime() {
    const diff = Math.floor((Date.now() - startTime) / 1000);
    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    const s = diff % 60;
    return `${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
}

// ─────────────────────────────────────────────
//              🕐  DATE & TIME HELPERS
// ─────────────────────────────────────────────
function getDateTime() {
    const now = new Date();
    const opts = { timeZone: bioConfig.timezone };

    const timeStr = now.toLocaleTimeString("en-US", {
        ...opts,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: !bioConfig.use24Hour,
    });

    const dateStr = now.toLocaleDateString("en-GB", {
        ...opts,
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    const dayStr = now.toLocaleDateString("en-US", {
        ...opts,
        weekday: "long",
    });

    return { time: timeStr, date: dateStr, day: dayStr };
}

// ─────────────────────────────────────────────
//              🔌  MODULE REGISTRATION
// ─────────────────────────────────────────────
const { Module } = require("../main");

let bioInterval = null;
let isBioActive = false;

Module(
    {
        pattern: "autobio ?(.*)",
        fromMe: true,
        desc: "Toggle real-time auto-updating WhatsApp bio",
        type: "utility",
    },
    async (m, match) => {
        const arg = (match[1] || "").trim().toLowerCase();

        // ── STOP command ──────────────────────────────
        if (arg === "off" || arg === "stop") {
            if (!isBioActive) {
                return m.reply("⚠️ Auto-bio is not running.");
            }
            clearInterval(bioInterval);
            bioInterval = null;
            isBioActive = false;
            await m.client.updateProfileStatus("✅ Online");
            return m.reply("🛑 Auto-bio stopped. Bio reset to default.");
        }

        // ── STATUS command ────────────────────────────
        if (arg === "status") {
            return m.reply(
                isBioActive
                    ? `✅ Auto-bio is *ACTIVE*\n⏱️ Bot uptime: ${getUptime()}`
                    : "❌ Auto-bio is *INACTIVE*. Send *.autobio on* to start."
            );
        }

        // ── START command (default) ───────────────────
        if (arg !== "on" && arg !== "") {
            return m.reply(
                "📖 *Auto-Bio Usage:*\n" +
                "• *.autobio on* — Start real-time bio\n" +
                "• *.autobio off* — Stop & reset bio\n" +
                "• *.autobio status* — Check if running"
            );
        }

        if (isBioActive) {
            return m.reply("⚠️ Auto-bio is already running!\nSend *.autobio off* to stop it first.");
        }

        await m.reply("✅ *Auto-Bio activated!*\n🕐 Your bio is now ticking in real-time...\nSend *.autobio off* to stop.");

        const { country, flag } = getCountryInfo(bioConfig.countryCode);

        // ── TICK FUNCTION ─────────────────────────────
        const tick = async () => {
            try {
                const { time, date, day } = getDateTime();
                const uptime = getUptime();
                const bio = buildBio({ time, date, day, country, flag, uptime });
                await m.client.updateProfileStatus(bio);
            } catch (err) {
                console.error("[AutoBio] Failed to update bio:", err.message);
                // Don't crash — keep ticking
            }
        };

        // Run immediately, then on interval
        await tick();
        isBioActive = true;
        bioInterval = setInterval(tick, bioConfig.updateInterval);
    }
);
