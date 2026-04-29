const products=[
{id:1,n:'NethPVP Kit',c:'2b2t Gear',p:1.35,t:'2B2T Netherite PVP Kit',note:true,img:'public/images/nethpvpkit.png'},
{id:2,n:'DiaPVP Kit',c:'2b2t Gear',p:1,t:'2B2T Diamond PVP Kit',note:true,img:'public/images/diapvpkit.png'},
{id:3,n:'Crystal Kit',c:'2b2t Gear',p:1.35,t:'2B2T Crystal PVP Kit',note:true,img:'public/images/crystpvpkit.png'},
{id:4,n:'Trapper Kit',c:'2b2t Gear',p:1.35,t:'2B2T Trapper Kit',note:true,img:'public/images/trapperpvpkit.png'},
{id:5,n:'WitherPVP Kit',c:'2b2t Gear',p:1,t:'2B2T Wither PVP Kit',note:true,img:'public/images/witherpvpkit.png'},
{id:6,n:'Parched Hoodie',c:'Cosmetics',p:0.15,t:'Parched Hoodie Cosmetic',note:true,img:'public/images/parchedhoodie.png'},
{id:7,n:'Happy Ghast Pilot',c:'Cosmetics',p:2.50,t:'Happy Ghast Pilot Cosmetic',note:true,f:1,img:'public/images/happyghastpilot.png'},
{id:8,n:'Mask of the Watcher',c:'Cosmetics',p:2.25,t:'Mask of the Watcher Cosmetic',note:true,img:'public/images/maskofthewatcher.png'},
{id:9,n:'Allay Hoodie',c:'Cosmetics',p:1.30,t:'Allay Hoodie Cosmetic',note:true,img:'public/images/allayhoodie.png'},
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
{id:21,n:'Amazon Prime 1m',c:'Entertainment',p:1.00,t:'Amazon Prime 1 Month',note:true,img:'public/images/prime1m.png'},
{id:22,n:'Amazon Prime 6m',c:'Entertainment',p:2.00,t:'Amazon Prime 6 Months',note:true,img:'public/images/prime6m.png'},
{id:23,n:'JioHotstar Super',c:'Entertainment',p:0.99,t:'JioHotstar Super Access',note:true,img:'public/images/jiohotstar.png'},
{id:24,n:'Minecraft Game Pass',c:'Games',p:7.90,t:'MCFA Access',note:true,img:'public/images/mcfa.webp'},
{id:25,n:'Minecraft Legends',c:'Games',p:1.70,t:'Minecraft Legends',note:true,img:'public/images/mclegends.jpg'},
{id:26,n:'Minecraft Dungeons',c:'Games',p:11.50,t:'Minecraft Dungeons Game',note:true,img:'public/images/mcdungeons.jpg'},
{id:27,n:'Copper Cape',c:'Capes',p:0.15,t:'Minecraft Copper Cape',note:true,img:'public/images/coppercape.png'},
{id:28,n:'Home Cape',c:'Capes',p:0.20,t:'Minecraft Home Cape',note:true,img:'public/images/homecape.png'},
{id:29,n:'Menace Cape',c:'Capes',p:0.40,t:'Minecraft Menace Cape',note:true,img:'public/images/menacecape.png'},
{id:30,n:'Purple Heart Cape',c:'Capes',p:3.10,t:'Minecraft Purple Heart Cape',note:true,f:1,img:'public/images/purpleheartcape.png'},
{id:31,n:'Optifine Cape',c:'Capes',p:0.40,t:'Minecraft Optifine Cape',note:true,img:'public/images/optifinecape.webp'}
];
const page=document.body.dataset.page;
const cart=JSON.parse(localStorage.getItem('cart')||'[]');
let cat='All';
const imageNoteText='Product images are examples only and may not represent the actual product.';
const money=n=>'$'+n.toFixed(2);
const save=()=>localStorage.setItem('cart',JSON.stringify(cart));
const total=()=>cart.reduce((a,i)=>a+i.p*i.q,0);
const count=()=>cart.reduce((a,i)=>a+i.q,0);
const cats=['All',...new Set(products.map(p=>p.c))];
const setCount=()=>{const el=document.querySelector('#cartCount');if(el)el.textContent=count();};
const add=id=>{const p=products.find(x=>x.id==id),i=cart.find(x=>x.id==id);i?i.q++:cart.push({...p,q:1});save();setCount();renderCart();};
const mod=(id,d)=>{const i=cart.find(x=>x.id==id);if(!i)return;i.q+=d;for(let j=cart.length-1;j>=0;j--)if(cart[j].q<1)cart.splice(j,1);save();setCount();renderCart();};
const del=id=>{const i=cart.findIndex(x=>x.id==id);if(i>-1)cart.splice(i,1);save();setCount();renderCart();};
function renderProducts(){
const q=(document.querySelector('#q')?.value||'').trim().toLowerCase();
const list=products.filter(p=>(cat==='All'||p.c===cat)&&(p.n+p.c+p.t).toLowerCase().includes(q));
const grouped={};
list.forEach(p=>{if(!grouped[p.c])grouped[p.c]=[];grouped[p.c].push(p);});
const catOrder=Object.keys(grouped);
document.querySelector('#grid').innerHTML=catOrder.map(c=>`<div class="category-section"><div class="category-header"><h2>${c}</h2><div class="category-bar"></div></div><div class="category-grid">${grouped[c].map(p=>`<article class="card${p.c==='Cosmetics'?' cosmetics-card':''}">${p.img?`<img src="${p.img}" alt="${p.n}" class="card-img" onerror="this.remove()">`:''}<h3>${p.n}</h3><p class="desc">${p.t}</p>${p.note!==false?`<p class="card-note">${imageNoteText}</p>`:''}<div class="row"><strong class="price">${money(p.p)}</strong></div><button class="primary" data-add="${p.id}">Add to Cart</button></article>`).join('')}</div></div>`).join('')||'<div class="empty">No results</div>';
}
function renderCart(){
const host=document.querySelector('#cartItems');if(!host)return;
host.innerHTML=cart.length?cart.map(i=>`<div class="item"><div class="item-top"><div><div class="title">${i.n}</div><div class="desc">${money(i.p)}</div></div><button class="ghost" data-del="${i.id}">Remove</button></div><div class="item-top"><div class="qty"><button data-dec="${i.id}">-</button><span>${i.q}</span><button data-inc="${i.id}">+</button></div><strong>${money(i.p*i.q)}</strong></div></div>`).join(''):'<div class="empty">Cart is empty.</div>';
document.querySelector('#subtotal').textContent=money(total());
}
if(page==='products'){
document.querySelector('#cats').innerHTML=cats.map(c=>`<button class="chip${c==='All'?' on':''}" data-cat="${c}">${c}</button>`).join('');
document.querySelector('#q').addEventListener('input',renderProducts);
document.querySelector('#cats').addEventListener('click',e=>{if(!e.target.dataset.cat)return;cat=e.target.dataset.cat;document.querySelectorAll('.chip').forEach(b=>b.classList.toggle('on',b.dataset.cat===cat));renderProducts();});
document.querySelector('#grid').addEventListener('click',e=>e.target.dataset.add&&add(e.target.dataset.add));
setCount();renderProducts();
}
if(page==='cart'){
renderCart();setCount();
document.querySelector('#cartItems').addEventListener('click',e=>{const d=e.target.dataset;if(d.inc)mod(d.inc,1);if(d.dec)mod(d.dec,-1);if(d.del)del(d.del);});
document.querySelector('#checkout').addEventListener('click',()=>{if(!cart.length)return;alert('Checkout not connected.');cart.length=0;save();setCount();renderCart();});
}