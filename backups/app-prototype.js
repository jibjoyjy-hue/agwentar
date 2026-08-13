function nav(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(screenId);
  if (target) target.classList.add('active');

  // Update bottom nav active state if it's a main tab
  const tabIds = ['screen-1', 'screen-11', 'screen-12', 'screen-16', 'screen-15'];
  if (tabIds.includes(screenId)) {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    // Find the button that calls this nav
    const btns = document.querySelectorAll('.nav-btn');
    const index = tabIds.indexOf(screenId);
    if(btns[index]) btns[index].classList.add('active');
  }
}