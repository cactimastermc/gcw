document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('mousedown', e => { if (e.button === 2) e.preventDefault(); });
document.addEventListener('keydown', e => {
  if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) || (e.ctrlKey && e.key === 'U')) {
    e.preventDefault();
  }
});

const escapeHTML = str => String(str).replace(/[&<>'"]/g, 
  tag => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'}[tag])
);

const products=[
{id:27,n:'Copper Cape',c:'Capes',p:0.15,t:'Minecraft Copper Cape',note:true,img:'public/images/coppercape.png'},
{id:28,n:'Home Cape',c:'Capes',p:0.20,t:'Minecraft Home Cape',note:true,img:'public/images/homecape.png'},
{id:29,n:'Menace Cape',c:'Capes',p:0.40,t:'Minecraft Menace Cape',note:true,img:'public/images/menacecape.png'},
{id:30,n:'Purple Heart Cape',c:'Capes',p:3.10,t:'Minecraft Purple Heart Cape',note:true,f:1,img:'public/images/purpleheartcape.png'},
{id:31,n:'Optifine Cape',c:'Capes',p:0.40,t:'Minecraft Optifine Cape',note:true,img:'public/images/optifinecape.webp'},
{id:24,n:'Minecraft Full Access Account',c:'Games',p:6,t:'MCFA Access',note:true,img:'public/images/mcfa.webp'},
{id:25,n:'Minecraft Legends',c:'Games',p:1.70,t:'Minecraft Legends',note:true,img:'public/images/mclegends.jpg'},
{id:26,n:'Minecraft Dungeons',c:'Games',p:11.50,t:'Minecraft Dungeons Game',note:true,img:'public/images/mcdungeons.jpg'},
{id:1,n:'NethPVP Kit',c:'2b2t Gear',p:1.35,t:'2B2T Netherite PVP Kit',note:true,img:'public/images/nethpvpkit.png'},
{id:2,n:'DiaPVP Kit',c:'2b2t Gear',p:1,t:'2B2T Diamond PVP Kit',note:true,img:'public/images/diapvpkit.png'},
{id:3,n:'Crystal Kit',c:'2b2t Gear',p:1.35,t:'2B2T Crystal PVP Kit',note:true,img:'public/images/crystpvpkit.png'},
{id:4,n:'Trapper Kit',c:'2b2t Gear',p:1.35,t:'2B2T Trapper Kit',note:true,img:'public/images/trapperpvpkit.png'},
{id:5,n:'WitherPVP Kit',c:'2b2t Gear',p:1,t:'2B2T Wither PVP Kit',note:true,img:'public/images/witherpvpkit.png'},
{id:6,n:'Parched Hoodie',c:'Cosmetics',p:0.15,t:'Parched Hoodie Cosmetic',note:true,img:'public/images/parchedhoodie.png'},
{id:7,n:'Happy Ghast Pilot',c:'Cosmetics',p:2.50,t:'Happy Ghast Pilot Cosmetic',note:true,f:1,img:'public/images/happyghastpilot.png'},
{id:8,n:'Mask of the Watcher',c:'Cosmetics',p:2.25,t:'Mask of the Watcher Cosmetic',note:true,img:'public/images/maskofthewatcher.png'},
{id:9,n:'Allay Hoodie',c:'Cosmetics',p:1.30,t:'Allay Hoodie Cosmetic',note:true,img:'public/images/allayhoodie.webp'},
{id:10,n:'Focus Retention Helmet',c:'Cosmetics',p:1.30,t:'Focus Retention Helmet Cosmetic',note:true,img:'public/images/focusretentionhelmet.png'},
{id:11,n:'Grimace Head',c:'Cosmetics',p:6.50,t:'Grimace Head Cosmetic',note:true,f:1,img:'public/images/grimacehead.png'},
{id:12,n:'Fry Helmet',c:'Cosmetics',p:6.50,t:'Fry Helmet Cosmetic',note:true,img:'public/images/fryhelmet.png'},
{id:13,n:'Hypixel VIP',c:'Ranks',p:4.25,t:'VIP rank',note:true,img:'public/images/vip.png'},
{id:14,n:'Hypixel MVP',c:'Ranks',p:22.50,t:'MVP rank',note:true,f:1,img:'public/images/mvp.png'},
{id:15,n:'Hypixel MVP+',c:'Ranks',p:32.50,t:'MVP+ rank',note:true,img:'public/images/mvp-plus.png'},
{id:16,n:'Hypixel MVP++',c:'Ranks',p:6.25,t:'MVP++ rank',note:true,img:'public/images/mvp-plus-plus.png'},
{id:17,n:'Basic 24/7 Server',c:'Hosting',p:1.50,t:'Basic Minecraft Server',note:true,img:'public/images/basicserver.png'},
{id:18,n:'Premium 24/7 Server',c:'Hosting',p:2.50,t:'Premium Minecraft Server',note:true,img:'public/images/premiumserver.png'},
{id:19,n:'YouTube Premium',c:'Entertainment',p:0.40,t:'YouTube Premium Access',note:true,img:'public/images/ytpremium.png'},
{id:20,n:'Crunchyroll 1m',c:'Entertainment',p:0.60,t:'Crunchyroll 1 Month',note:true,img:'public/images/crunchyroll.png'},
{id:21,n:'Amazon Prime 1m',c:'Entertainment',p:1.00,t:'Amazon Prime 1 Month',note:true,img:'public/images/amazonprime.webp'},
{id:22,n:'Amazon Prime 6m',c:'Entertainment',p:2.00,t:'Amazon Prime 6 Months',note:true,img:'public/images/amazonprime.webp'},
{id:23,n:'JioHotstar Super',c:'Entertainment',p:0.99,t:'JioHotstar Super Access',note:true,img:'public/images/disneyhotstar.jpg'}
];
const loadCart=()=>{
  try {
    const stored=JSON.parse(localStorage.getItem('cart')||'[]');
    if(!Array.isArray(stored)) return [];
    return stored.map(item=>{
      const p=products.find(x=>x.id==item.id);
      if(!p) return null;
      const q=Math.max(1,parseInt(item.q)||1);
      return {...p,q};
    }).filter(Boolean);
  } catch(e){ return []; }
};
const page=document.body.dataset.page;
const cart=loadCart();
let cat='All';
const imageNoteText='Product images are examples only and may not represent the actual product.';
const money=n=>'$'+n.toFixed(2);
const save=()=>localStorage.setItem('cart',JSON.stringify(cart.map(i=>({id:i.id,q:i.q}))));
const total=()=>cart.reduce((a,i)=>a+i.p*i.q,0);
const count=()=>cart.reduce((a,i)=>a+i.q,0);
const categoryPriority={Capes:0,Games:1,Ranks:2,Hosting:3,Entertainment:99};
const cats=['All',...Array.from(new Set(products.map(p=>p.c))).sort((a,b)=>{const pa=categoryPriority[a]??99;const pb=categoryPriority[b]??99;return pa!==pb?pa-pb:a.localeCompare(b);})];
const qtyState=Object.fromEntries(products.map(p=>[p.id,1]));
const setCount=()=>{const el=document.querySelector('#cartCount');if(el)el.textContent=count();};
const initBackgroundDots=()=>{const count=window.innerWidth<768?75:250;const container=document.createElement('div');container.id='bgDots';document.body.append(container);const dots=[];for(let i=0;i<count;i++){const dot=document.createElement('div');dot.className='bg-dot';const x=Math.random()*100;const y=Math.random()*100;const size=1.5+Math.random()*3;dot.dataset.x=x;dot.dataset.y=y;dot._homeX=x;dot._homeY=y;dot._x=x;dot._y=y;dot._vx=(Math.random()-0.5)*0.02;dot._vy=(Math.random()-0.5)*0.02;dot._seed=Math.random()*Math.PI*2;dot.style.left=`${x}%`;dot.style.top=`${y}%`;dot.style.width=`${size}px`;dot.style.height=`${size}px`;dot.style.opacity=0.6+Math.random()*0.35;container.append(dot);dots.push(dot);}return dots;};
const bgDots=initBackgroundDots();
let mouse={x:-9999,y:-9999};
window.addEventListener('mousemove',e=>{mouse.x=e.clientX;mouse.y=e.clientY;});
let lastDotFrame=performance.now();
const animateBackgroundDots=()=>{const now=performance.now();const dt=Math.min((now-lastDotFrame)/16.6667,2);lastDotFrame=now;const w=window.innerWidth;const h=window.innerHeight;const time=now*0.001;bgDots.forEach((dot,index)=>{let x=dot._x;let y=dot._y;let vx=dot._vx;let vy=dot._vy;const screenX=x/100*w;const screenY=y/100*h;const dx=mouse.x-screenX;const dy=mouse.y-screenY;const dist=Math.hypot(dx,dy);const homeSpring=0.0025;const mouseRadius=260;const mousePull=dist<mouseRadius?(1-dist/mouseRadius)*0.0045:0;vx += (dot._homeX-x)*homeSpring*dt;vy += (dot._homeY-y)*homeSpring*dt;if(mousePull){const angle=Math.atan2(dy,dx);vx += Math.cos(angle)*mousePull*dt;vy += Math.sin(angle)*mousePull*dt;}const driftX=Math.sin(time*0.35+dot._seed+index*0.015)*0.0012;const driftY=Math.cos(time*0.3+dot._seed*1.3+index*0.01)*0.0012;vx += driftX*dt;vy += driftY*dt;const damping=Math.pow(0.97,dt);vx *= damping;vy *= damping;x += vx*dt;y += vy*dt;if(x<0){x=0;vx=Math.abs(vx)*0.72;}else if(x>100){x=100;vx=-Math.abs(vx)*0.72;}if(y<0){y=0;vy=Math.abs(vy)*0.72;}else if(y>100){y=100;vy=-Math.abs(vy)*0.72;}dot._x=x;dot._y=y;dot._vx=vx;dot._vy=vy;dot.style.transform=`translate3d(${(x-dot._homeX)/100*w}px, ${(y-dot._homeY)/100*h}px, 0)`;});requestAnimationFrame(animateBackgroundDots);};
requestAnimationFrame(animateBackgroundDots);
const toast=(message)=>{let host=document.querySelector('#toast');if(!host){host=document.createElement('div');host.id='toast';host.className='toast-container';document.body.append(host);}const note=document.createElement('div');note.className='toast';note.textContent=message;host.append(note);note.addEventListener('animationend',()=>note.remove());};
const add=(id,qty=1)=>{const p=products.find(x=>x.id==id);if(!p)return;const amount=Math.max(0,Math.floor(qty));if(amount<1){toast('Select at least 1 item before adding.');qtyState[id]=1;if(page==='products'){const el=document.querySelector(`[data-qty-value="${id}"]`);if(el)el.textContent=1;}return;}const i=cart.find(x=>x.id==id);if(i)i.q+=amount;else cart.push({...p,q:amount});save();setCount();toast(`Added ${amount}× ${p.n} to cart`);qtyState[id]=1;if(page==='products'){const el=document.querySelector(`[data-qty-value="${id}"]`);if(el)el.textContent=1;}if(page==='cart')renderCart();};
const mod=(id,d)=>{const i=cart.find(x=>x.id==id);if(!i)return; i.q+=d;for(let j=cart.length-1;j>=0;j--)if(cart[j].q<1)cart.splice(j,1);save();setCount();if(page==='products')renderProducts();if(page==='cart')renderCart();};
const del=id=>{const i=cart.findIndex(x=>x.id==id);if(i>-1)cart.splice(i,1);save();setCount();renderCart();};
function renderProducts(){
const q=(document.querySelector('#q')?.value||'').trim().toLowerCase();
const list=products.filter(p=>(cat==='All'||p.c===cat)&&(p.n+p.c+p.t).toLowerCase().includes(q));
const grouped={};
list.forEach(p=>{if(!grouped[p.c])grouped[p.c]=[];grouped[p.c].push(p);});
const catOrder=Object.keys(grouped).sort((a,b)=>{const pa=categoryPriority[a]??99;const pb=categoryPriority[b]??99;return pa!==pb?pa-pb:a.localeCompare(b);});
const grid=document.querySelector('#grid');
if(!grid)return;
const newHTML=catOrder.map(c=>`<div class="category-section"><div class="category-header"><h2>${escapeHTML(c)}</h2><div class="category-bar"></div></div><div class="category-grid">${grouped[c].map(p=>`<article class="card${p.c==='Cosmetics'?' cosmetics-card':''}">${p.img?`<img src="${escapeHTML(p.img)}" alt="${escapeHTML(p.n)}" class="card-img" onerror="this.remove()">`:''}<h3>${escapeHTML(p.n)}</h3><p class="desc">${escapeHTML(p.t)}</p>${p.note!==false?`<p class="card-note">${escapeHTML(imageNoteText)}</p>`:''}<div class="row"><strong class="price">${money(p.p)}</strong></div><div class="card-actions"><div class="qty-group"><button class="ghost" data-qty-dec="${p.id}">-</button><span class="qty-display" data-qty-value="${p.id}">${qtyState[p.id]||1}</span><button class="ghost" data-qty-inc="${p.id}">+</button></div><button class="primary" data-add="${p.id}">Add to Cart</button></div></article>`).join('')}</div></div>`).join('')||'<div class="empty">No results</div>';

if(grid.innerHTML===''){
  grid.innerHTML=newHTML;
  void grid.offsetHeight;
  grid.style.opacity='1';
  grid.style.transform='translateY(0)';
}else{
  grid.style.opacity='0';
  grid.style.transform='translateY(12px)';
  setTimeout(()=>{
    grid.innerHTML=newHTML;
    void grid.offsetHeight;
    grid.style.opacity='1';
    grid.style.transform='translateY(0)';
  }, 200);
}
}
function renderCart(){
const host=document.querySelector('#cartItems');if(!host)return;
host.innerHTML=cart.length?cart.map(i=>`<div class="item"><div class="item-top"><div><div class="title">${escapeHTML(i.n)}</div><div class="desc">${money(i.p)}</div></div><button class="ghost" data-del="${i.id}">Remove</button></div><div class="item-top"><div class="qty"><button data-dec="${i.id}">-</button><span>${i.q}</span><button data-inc="${i.id}">+</button></div><strong>${money(i.p*i.q)}</strong></div></div>`).join(''):'<div class="empty">Cart is empty.</div>';
document.querySelector('#subtotal').textContent=money(total());
}
if(page==='products'){
document.querySelector('#cats').innerHTML=cats.map(c=>`<button class="chip${c==='All'?' on':''}" data-cat="${c}">${c}</button>`).join('');
document.querySelector('#q').addEventListener('input',renderProducts);
document.querySelector('#cats').addEventListener('click',e=>{if(!e.target.dataset.cat)return;cat=e.target.dataset.cat;document.querySelectorAll('.chip').forEach(b=>b.classList.toggle('on',b.dataset.cat===cat));renderProducts();});
document.querySelector('#grid').addEventListener('click',e=>{
  if(e.target.dataset.add) add(e.target.dataset.add, qtyState[e.target.dataset.add]);
  if(e.target.dataset.qtyInc){const id=e.target.dataset.qtyInc;qtyState[id]=Math.min(999,(qtyState[id]||1)+1);const el=document.querySelector(`[data-qty-value="${id}"]`);if(el)el.textContent=qtyState[id];}
  if(e.target.dataset.qtyDec){const id=e.target.dataset.qtyDec;qtyState[id]=Math.max(0,(qtyState[id]||1)-1);const el=document.querySelector(`[data-qty-value="${id}"]`);if(el)el.textContent=qtyState[id];}
  if(e.target.dataset.inc) mod(e.target.dataset.inc,1);
  if(e.target.dataset.dec) mod(e.target.dataset.dec,-1);
});
setCount();renderProducts();
}
if(page==='cart'){
renderCart();setCount();
document.querySelector('#cartItems').addEventListener('click',e=>{const d=e.target.dataset;if(d.inc)mod(d.inc,1);if(d.dec)mod(d.dec,-1);if(d.del)del(d.del);});
document.querySelector('#checkout').addEventListener('click', async () => {
  if (!cart.length) return;
  const name = prompt("Please enter your name for the order checkout:");
  if (!name) return;
  const email = prompt("Please enter your email address to receive your order:");
  if (!email) return;

  const originalText = document.querySelector('#checkout').textContent;
  document.querySelector('#checkout').textContent = 'Processing...';

  try {
    const res = await fetch('http://localhost:3000/api/tickets/create', { // Use your Vercel domain later, e.g. https://your-ticket-system.vercel.app/api/tickets/create
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        subject: `New Order from ${name} - Garfield's Store`,
        message: 'I would like to purchase the following items:',
        cart: cart // The API route will format the products automatically!
      })
    });

    const data = await res.json();
    document.querySelector('#checkout').textContent = originalText;
    
    if (data.error) {
      alert('Error creating order ticket: ' + data.error);
    } else {
      alert('Order placed successfully! Your ticket ID is ' + data.id);
      // Optional: window.location.href = `http://localhost:3000${data.ticketUrl}`;
      cart.length = 0;
      save();
      setCount();
      renderCart();
    }
  } catch (err) {
    alert('Network error. Make sure the ticket system API is running.');
    document.querySelector('#checkout').textContent = originalText;
  }
});
}