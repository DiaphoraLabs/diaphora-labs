// The sign-in page for the Bioveld briefing. A standalone document in the
// Diaphora tokens, like the parked home page, so the site chrome never reaches it.
export function loginPage({ action, error }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#0b1815">
<title>Bioveld · Diaphora Labs</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,400..900&family=Martian+Mono:wght@400;500;600&family=Source+Serif+4:ital,opsz,wght@0,8..60,300..500;1,8..60,400&display=swap">
<style>
:root{
  --patina-deep:#0b1815;--patina:#123029;--patina-edge:#1e4a3e;
  --bronze:#b8894a;--bronze-bright:#d9a865;
  --bone:#ece7d9;--bone-dim:#a9b5ac;--bone-faint:#7c9086;
  --current:#cbf51f;--alarm:#f0b7a0;
  --display:"Archivo","Helvetica Neue",Arial,sans-serif;
  --body:"Source Serif 4",Georgia,"Times New Roman",serif;
  --mono:"Martian Mono",ui-monospace,"SFMono-Regular",Menlo,monospace;
  --ease:cubic-bezier(.16,1,.3,1);
  color-scheme:dark;
}
*{box-sizing:border-box}
body{background:var(--patina-deep);color:var(--bone);font-family:var(--body);margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:56px 24px 40px;text-align:center;-webkit-font-smoothing:antialiased}
::selection{background:var(--current);color:var(--patina-deep)}
.wrap{width:100%;max-width:30rem;display:flex;flex-direction:column;align-items:center}
.lockup{display:flex;align-items:center;gap:9px;margin-bottom:44px}
.lockup span{font-family:var(--display);font-weight:900;font-stretch:125%;font-size:11px;letter-spacing:.07em}
.label{font-family:var(--mono);font-size:9px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--bronze)}
h1{font-family:var(--display);font-weight:900;font-stretch:125%;font-size:clamp(2.6rem,11vw,4.4rem);line-height:.95;letter-spacing:-.02em;margin:14px 0 0;text-transform:uppercase}
.sub{font-size:clamp(1.02rem,3vw,1.2rem);line-height:1.5;color:var(--bone-dim);margin:20px 0 0;text-wrap:pretty}
.rule{width:60px;height:3px;background:var(--bronze);margin:34px 0 0}
form{margin:34px 0 0;width:100%;display:flex;flex-direction:column;gap:12px;align-items:stretch}
label{font-family:var(--mono);font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--bone-faint);text-align:left}
input{font:500 16px/1.2 var(--mono);letter-spacing:.06em;color:var(--bone);background:var(--patina);border:1px solid var(--patina-edge);padding:14px 14px;border-radius:0;width:100%}
input:focus{outline:2px solid var(--current);outline-offset:2px;border-color:var(--bronze)}
input[aria-invalid="true"]{border-color:var(--alarm)}
button{font-family:var(--mono);font-weight:600;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--patina-deep);background:var(--current);border:1px solid var(--current);padding:15px 26px;cursor:pointer;transition:background 200ms var(--ease),border-color 200ms var(--ease)}
button:hover{background:var(--bone);border-color:var(--bone)}
button:focus-visible{outline:2px solid var(--bone);outline-offset:3px}
.err{font-family:var(--mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--alarm);text-align:left;margin:0}
.foot{font-family:var(--mono);font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:var(--bone-faint);margin-top:56px;line-height:2}
@media (prefers-reduced-motion:reduce){*{transition-duration:1ms!important}}
</style>
</head>
<body>
<div class="wrap">
  <div class="lockup">
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M3 17h9V7h9" fill="none" stroke="#ece7d9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
    <span>DIAPHORA LABS</span>
  </div>
  <span class="label">Private briefing</span>
  <h1>Bioveld</h1>
  <p class="sub">A circular campus concept for BMI Group's lands in Thorold. Enter the password you were given to continue.</p>
  <div class="rule" role="presentation"></div>
  <form method="post" action="${action}">
    <label for="password">Password</label>
    <input id="password" name="password" type="password" autocomplete="current-password" required autofocus${error ? ' aria-invalid="true" aria-describedby="err"' : ''}>
    ${error ? '<p class="err" id="err" role="alert">That password didn\'t match. Try again.</p>' : ''}
    <button type="submit">Open the briefing</button>
  </form>
  <p class="foot">Diaphora Labs &middot; Niagara Falls, Ontario</p>
</div>
</body>
</html>
`;
}
