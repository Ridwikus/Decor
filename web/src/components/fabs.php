<?php /** @var array $site */ ?>
<!-- FLOATING ACTIONS (sticky bottom-right) -->
<aside aria-label="Quick actions" class="dd-fabs fixed z-50 flex flex-col items-end gap-4">
  <a href="#home" class="dd-top is-hidden relative mr-1 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white text-accent shadow-[0_10px_24px_rgba(43,37,35,0.18)] hover:text-accent" aria-label="Back to top" tabindex="-1" aria-hidden="true" data-top>
    <svg class="absolute inset-0 -rotate-90" width="52" height="52" viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="23" fill="none" stroke="#EDE4DF" stroke-width="2"/><circle cx="26" cy="26" r="23" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="144.5" stroke-dashoffset="144.5" data-top-ring/></svg>
    <svg class="dd-top-arrow" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5"/><path d="M6 11l6 -6l6 6"/></svg>
  </a>
  <div class="dd-wa flex items-center gap-4">
    <a href="<?= e($site['wa_chat']) ?>" target="_blank" rel="noopener" class="dd-wa-label inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full bg-white px-[18px] font-sans text-[16px] font-medium tracking-[0.02em] text-accent shadow-[0_10px_24px_rgba(43,37,35,0.16)] hover:text-accent" tabindex="-1" aria-hidden="true">Chat with us</a>
    <a href="<?= e($site['wa_chat']) ?>" target="_blank" rel="noopener" class="dd-wa-fab flex h-[60px] w-[60px] items-center justify-center rounded-full bg-whatsapp shadow-[0_14px_30px_rgba(43,37,35,0.24)]" aria-label="Chat with us on WhatsApp (opens in a new tab)">
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9"/><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1"/></svg>
    </a>
  </div>
</aside>
