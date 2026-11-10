const icons={"home": "<path d=\"m3 10 9-7 9 7v10H3z\"/><path d=\"M9 20v-7h6v7\"/>", "story": "<path d=\"M12 5v15M3 4c4-1 6 0 9 2 3-2 5-3 9-2v15c-4-1-6 0-9 2-3-2-5-3-9-2z\"/>", "fortune": "<circle cx=\"12\" cy=\"10\" r=\"7\"/><path d=\"M7 19h10l2 3H5zM8 10a4 4 0 0 1 4-4\"/>", "stars": "<path d=\"m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3z\"/>", "game": "<path d=\"m13 3-3 6 5 4 3 7M10 9l-5 5 4 3-4 4M15 13l5-2\"/><circle cx=\"16\" cy=\"4\" r=\"2\"/>", "play": "<path d=\"m9 5 10 7-10 7z\"/>", "pause": "<path d=\"M8 5v14M16 5v14\"/>", "stop": "<rect x=\"6\" y=\"6\" width=\"12\" height=\"12\" rx=\"1\"/>", "prev": "<path d=\"m15 5-7 7 7 7\"/>", "next": "<path d=\"m9 5 7 7-7 7\"/>"};
function icon(name){return `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${icons[name]||icons.stars}</svg>`}

const verses=[["V <strong>KARATu</strong> se před svátky zas tlačítka stěhují,", "kolegové místo dárků nové menu studují.", "„Kam se schovalo Uložit?“ Každý chvíli tápe,", "ani <strong>Majkl</strong> napoprvé novou změnu nechápe."], ["<strong>Iris</strong> hledá nápovědu, <strong>Katka</strong> zkouší zadání,", "<strong>Technik</strong> už si rovná brýle, pouští se do pátrání.", "Pak se ozve: „Tady dole! Schovali ho pod seznam!“", "Všichni kliknou, oddechnou si: „Příště už to najdu sám.“"], ["„Kde mám kartu k pojištění?“ Někdo hledá v přihrádce,", "„V <strong>eRku</strong> přece, v telefonu!“ zazní rada zakrátce.", "Kdyby cestou přišla škoda, pomoc máme po ruce,", "teď už vzhůru za rodinou, konečně jsou Vánoce."], ["Venku štípe <strong>Mráz</strong> a zebe, <strong>Černá</strong> noc už kryje kraj,", "doma čeká teplá deka, něco k snědku, horký čaj.", "Vrabec, který <strong>Hnízdil</strong> v budce, načepýřil peří,", "sypem zrní do krmítka, než si dáme večeři."], ["Na stole už čeká <strong>Kuba</strong>, každý by si kousek dal,", "vedle voní <strong>Beránek</strong> — kdo tu špatnou formu vzal?", "<strong>Kyselý</strong> je salát? Trochu. „Přidej ještě smetanu!“", "„Hlavně už nic neujídej, nebo nic nedostanu!“"], ["Jeden <strong>Fousek</strong> zpod ubrusu prozrazuje její skrýš,", "<strong>Ryba</strong> voní na podnose, <strong>Micka</strong> už je zase blíž.", "<strong>Hodná</strong> ruka v pravou chvíli podstrčí jí mističku,", "kapr zůstal pro rodinu, něco zbylo pro kočičku."], ["Malý <strong>Klouček</strong> ještě venku sněhuláka staví,", "mrkev místo nosu dát, ho ze všeho nejvíc baví.", "Jenže <strong>Kopačka</strong> mu sklouzne, už se válí v závěji,", "vstává celý od sněhu, ostatní se zasmějí."], ["<strong>Zelený</strong> strom v koutě září, ozdoby se třpytí,", "<strong>Slámová</strong> je hvězda, která na vrcholku svítí.", "Další dárek <strong>Přibyl</strong> pod něj, mašle se mu leskne,", "<strong>Dvouletá</strong> k němu běží, radostí si tleskne."], ["Z rádia už místo koled zase hraje <strong>Pop</strong>,", "někdo zpívá, někdo tančí, až se třese strop.", "Babička se směje z křesla: „Ztište aspoň maličko,", "nebo tím svým poskakováním shodíte nám jmelíčko!“"], ["<strong>Veselá</strong> je celá parta, nikdo nikam nespěchá,", "telefon dnes leží stranou, každý si ho rád nechá.", "<strong>Svoboda</strong> je nemít budík, nemuset hned ráno vstát,", "otočit se na druhý bok, ještě chvíli klidně spát."], ["<strong>Srdečná</strong> jsou všechna přání, co si dneska posíláme,", "největší je stejně radost, že tu jeden druhého máme.", "<strong>Pokorná</strong> je naše prosba: ať jsme zdraví celý rok,", "ať nás štěstí doprovází na každičký další krok."], ["V <strong>RESPECTu</strong> jsme celý rok klientům po boku,", "pomáháme s riziky na každém jejich kroku.", "Do nového roku přejme zdraví, štěstí, splněná přání,", "ať je víc těch hezkých chvil a míň škod k vyřizování."]];const titles=["KARAT stěhuje tlačítka", "Iris, Katka a Technik", "eRko na cestu domů", "Mráz, noc a Hnízdil", "Štědrovečerní večeře", "Micka a kapr", "Sněhulák a Kopačka", "Stromeček a dárky", "Vánoční diskotéka", "Veselá a Svoboda", "Srdečná přání", "PF 2027"];const chapters=["Poslední den v kanceláři", "Poslední den v kanceláři", "Poslední den v kanceláři", "Cesta domů a vánoční stůl", "Cesta domů a vánoční stůl", "Cesta domů a vánoční stůl", "Cesta domů a vánoční stůl", "Cesta domů a vánoční stůl", "Cesta domů a vánoční stůl", "Pohoda a přání", "Pohoda a přání", "Pohoda a přání"];
const $=id=>document.getElementById(id);let sceneIndex=0;let activeView='home';let voice=false;let stars=[];let gameRunning=false;let lastFrame=0;let score=0;let obstacleX=95;let jumpStart=0;let best=0;let gameId=0;
function toast(msg){const el=$('toast');el.textContent=msg;el.hidden=false;clearTimeout(window._toastTimer);window._toastTimer=setTimeout(()=>el.hidden=true,2800)}
function nav(view){document.body.classList.remove('constellation-printing');if(!['home','story','fortune','stars','game'].includes(view))view='home';activeView=view;document.querySelectorAll('.view').forEach(x=>x.classList.toggle('active',x.id==='view-'+view));document.querySelectorAll('[data-nav]').forEach(x=>{if((x.classList.contains('nav-link')||x.classList.contains('dock-item'))){if(x.dataset.nav===view)x.setAttribute('aria-current','page');else x.removeAttribute('aria-current')}});try{history.replaceState(null,'','#'+view)}catch(e){}window.scrollTo({top:0,behavior:'instant'});if(view!=='story')stopVoice();if(view==='stars')drawStars();if(view!=='game'&&run.state==='running')pauseGame();}
document.querySelectorAll('[data-nav]').forEach(el=>el.addEventListener('click',()=>nav(el.dataset.nav)));
let storyEpoch=0, storyWanted=false, storyLoadTimer=0;
const storyAudio=$('scene-audio');
function playerUI(){
 $('narrate').innerHTML=icon(voice?'pause':'play');$('narrate').setAttribute('aria-label',voice?'Pozastavit pohádku':'Přehrát pohádku');
 $('narrate').setAttribute('aria-pressed',String(voice));$('narrate').title=voice?'Pozastavit pohádku':'Přehrát pohádku';
 $('story-state').textContent=voice?'Přehrává se':storyAudio.currentTime>0?'Pozastaveno':'Připraveno';
}
function stopVoice(){storyEpoch++;storyWanted=false;clearTimeout(storyLoadTimer);storyAudio.pause();voice=false;playerUI()}
function renderStory(){
 stopVoice();storyAudio.removeAttribute('src');storyAudio.load();
 $('scene-title').textContent=titles[sceneIndex];$('scene-group').textContent=chapters[sceneIndex];$('scene-count').textContent=String(sceneIndex+1).padStart(2,'0')+' / 12';$('counter').textContent=(sceneIndex+1)+' z 12';$('chapter').textContent='Sloka '+(sceneIndex+1);
 $('verse').innerHTML=verses[sceneIndex].map(l=>'<span class="verse-line">'+l+'</span>').join('');$('prev').disabled=sceneIndex===0;$('next').disabled=sceneIndex===11;
 document.querySelectorAll('.thumb').forEach((b,i)=>b.setAttribute('aria-current',String(i===sceneIndex)));playerUI();
}
function nextStory(){if(!storyWanted)return;if(sceneIndex<verses.length-1){sceneIndex++;renderStory();playStory()}else{stopVoice();$('story-state').textContent='Konec pohádky. Krásné Vánoce!'}}
function missingAudio(epoch){if(epoch!==storyEpoch||!storyWanted)return;stopVoice();storyAudio.removeAttribute('src');storyAudio.load();$('story-state').textContent='Nahrávku se nepodařilo načíst. Zkus přehrání znovu.'}
async function playStory(){
 const epoch=++storyEpoch;storyWanted=true;voice=true;playerUI();
 if(!storyAudio.getAttribute('src'))storyAudio.src='assets/narace_'+String(sceneIndex+1).padStart(2,'0')+'.mp3';
 storyAudio.onended=nextStory;storyAudio.onerror=()=>missingAudio(epoch);
 clearTimeout(storyLoadTimer);storyLoadTimer=setTimeout(()=>missingAudio(epoch),15000);
 try{await storyAudio.play();if(epoch!==storyEpoch)return;clearTimeout(storyLoadTimer)}catch(e){if(epoch!==storyEpoch)return;if(e.name==='NotAllowedError'){stopVoice();$('story-state').textContent='Pro pokračování klepni na Přehrát.'}else if(e.name!=='AbortError')missingAudio(epoch)}
}
function changeStory(i){const resume=storyWanted;sceneIndex=Math.max(0,Math.min(11,i));renderStory();if(resume)playStory()}
$('prev').onclick=()=>changeStory(sceneIndex-1);$('next').onclick=()=>changeStory(sceneIndex+1);
$('narrate').onclick=()=>voice?stopVoice():playStory();$('story-stop').onclick=()=>{sceneIndex=0;renderStory()};
$('thumbs').innerHTML=titles.map((t,i)=>'<button class="thumb stanza-choice" aria-label="Sloka '+(i+1)+': '+t+'" data-scene="'+i+'"><span>'+String(i+1).padStart(2,'0')+'</span><span>'+t+'</span></button>').join('');
$('thumbs').onclick=e=>{const b=e.target.closest('[data-scene]');if(b)changeStory(Number(b.dataset.scene))};
$('scene-audio').addEventListener('waiting',()=>{if(storyWanted){clearTimeout(storyLoadTimer);const epoch=storyEpoch;storyLoadTimer=setTimeout(()=>missingAudio(epoch),15000)}});
$('scene-audio').addEventListener('playing',()=>clearTimeout(storyLoadTimer));
document.addEventListener('keydown',e=>{if(/INPUT|TEXTAREA|SELECT|BUTTON/.test(document.activeElement.tagName))return;if(activeView==='story'){if(e.key==='ArrowLeft')$('prev').click();if(e.key==='ArrowRight')$('next').click();if(e.code==='Space'){e.preventDefault();$('narrate').click()}}if(activeView==='game'&&(e.code==='Space'||e.code==='ArrowUp')){e.preventDefault();jump()}});

const fortuneData={work:['KARAT ti v roce 2027 konečně nechá tlačítko Uložit tam, kde ho čekáš.','Iris s Katkou ti ušetří tolik klikání, že si stihneš vychutnat kávu ještě teplou.','Nejlepší pracovní nápad přijde ve chvíli, kdy zrovna nebudeš mít otevřený e-mail.','Tvůj kalendář bude mít víc volných oken než vánočně vyzdobená kancelář.'],luck:['V roce 2027 se ti splní malé přání, které jsi zatím nikomu neprozradil/a.','Čeká tě tolik příjemných náhod, že začneš podezírat vesmír ze spolupráce.','Tvůj nejšťastnější den přijde úplně nenápadně, zato s pořádnou dávkou smíchu.','Najdeš něco důležitého — možná klíče, možná čas na sebe.'],christmas:['Cukroví letos záhadně zmizí. Hlavním podezřelým budeš ty.','Vánoční klid začne přesně ve chvíli, kdy vypneš pracovní notifikace.','Pod stromečkem najdeš víc radosti než mašlí.','Někdo ti dá ten nejhezčí dárek: svůj čas.'],fun:['Rok 2027 má pro tebe připravený plot twist. Naštěstí ten vtipný.','V důležité chvíli se objeví správný člověk a řekne: „Tady je to Uložit.“','Osud hlásí: aktualizace úspěšná, dobrá nálada nainstalována.','Vesmír ti posílá emoji 🎄 a vzkaz: „Neboj, to nejhezčí teprve přijde.“']};
let oracleHaptics=true;
function oracleFeedback(pattern=12){
 const orb=$('tell-fortune');orb.classList.remove('touch-feedback');void orb.offsetWidth;orb.classList.add('touch-feedback');
 if(oracleHaptics&&typeof navigator.vibrate==='function'){try{navigator.vibrate(pattern)}catch{}}
}
$('oracle-haptics').onclick=()=>{oracleHaptics=!oracleHaptics;$('oracle-haptics').setAttribute('aria-pressed',String(oracleHaptics));$('oracle-haptics').textContent='Haptická odezva · '+(oracleHaptics?'zapnutá':'vypnutá');if(oracleHaptics)oracleFeedback()};
if(typeof navigator.vibrate!=='function'){$('oracle-haptics').hidden=true;$('oracle-feedback-note').textContent='Koule reaguje světlem a pohybem. Vibrace tento prohlížeč nepodporuje.'}
else $('oracle-feedback-note').textContent='Jemné vibrace při dotyku a odhalení věštby. Podle nastavení telefonu.';
let fortuneTopic='work',fortuneLast=-1,fortuneBusy=false,fortuneHistory=[];
document.querySelectorAll('#oracle-topics [data-topic]').forEach(b=>b.addEventListener('click',()=>{fortuneTopic=b.dataset.topic;oracleFeedback(8);document.querySelectorAll('#oracle-topics [data-topic]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));}));
function castFortune(){if(fortuneBusy)return;fortuneBusy=true;oracleFeedback([12,45,18]);const orb=$('tell-fortune');orb.classList.remove('casting');void orb.offsetWidth;orb.classList.add('casting');$('fortune-result').textContent='Hvězdy přemýšlejí…';const sparks=$('oracle-sparks');sparks.replaceChildren();for(let i=0;i<18;i++){let p=document.createElement('i'),a=i*Math.PI*2/18;p.style.setProperty('--x',(Math.cos(a)*(125+i%3*22))+'px');p.style.setProperty('--y',(Math.sin(a)*(115+i%3*23))+'px');sparks.appendChild(p)}window.setTimeout(()=>{const arr=fortuneData[fortuneTopic];let next=Math.floor(Math.random()*arr.length);if(next===fortuneLast)next=(next+1)%arr.length;fortuneLast=next;const name=$('oracle-name').value.trim();const prediction=(name?name+', ':'')+arr[next];$('fortune-result').textContent=prediction;fortuneHistory.unshift(prediction);fortuneHistory=fortuneHistory.slice(0,3);$('fortune-history').replaceChildren(...fortuneHistory.map(v=>{let p=document.createElement('p');p.textContent='✧ '+v;return p}));orb.classList.remove('casting');oracleFeedback([16,40,24]);fortuneBusy=false},820)}
$('tell-fortune').addEventListener('click',()=>{if(orbGestureCast){orbGestureCast=false;return}castFortune()});$('fortune-again').addEventListener('click',castFortune);
let orbStart=null,orbHold=0,orbGestureCast=false;
const fortuneOrb=$('tell-fortune');
fortuneOrb.addEventListener('pointerdown',e=>{
 orbStart={x:e.clientX,y:e.clientY};orbGestureCast=false;oracleFeedback(8);fortuneOrb.classList.add('is-touching');
 clearTimeout(orbHold);orbHold=setTimeout(()=>{if(orbStart){orbGestureCast=true;castFortune()}},480);
});
fortuneOrb.addEventListener('pointermove',e=>{if(!orbStart)return;const dx=e.clientX-orbStart.x,dy=e.clientY-orbStart.y;fortuneOrb.style.setProperty('--touch-x',Math.max(-7,Math.min(7,dx/8))+'px');fortuneOrb.style.setProperty('--touch-y',Math.max(-7,Math.min(7,dy/8))+'px');if(Math.hypot(dx,dy)>28)clearTimeout(orbHold)});
function releaseOrb(e){clearTimeout(orbHold);if(e.type==='pointerup'&&orbStart&&!orbGestureCast&&Math.hypot(e.clientX-orbStart.x,e.clientY-orbStart.y)>32){orbGestureCast=true;castFortune()}orbStart=null;fortuneOrb.classList.remove('is-touching');fortuneOrb.style.setProperty('--touch-x','0px');fortuneOrb.style.setProperty('--touch-y','0px')}
fortuneOrb.addEventListener('pointerup',releaseOrb);fortuneOrb.addEventListener('pointercancel',releaseOrb);fortuneOrb.addEventListener('pointerleave',releaseOrb);
$('copy-fortune').onclick=async()=>{const t=$('fortune-result').textContent;if(!fortuneHistory.length){toast('Nejdřív požádej kouli o předpověď');return}try{await navigator.clipboard.writeText(t);toast('Předpověď zkopírována')}catch{const ta=document.createElement('textarea');ta.value=t;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();toast('Předpověď připravena ke sdílení')}};
const employeeNames=["Vojtěch Andrle", "Filip Andrle", "Karel Antošík", "Semih Arikan", "Lenka Babková", "Miriam Baďurová", "Karolina Balíková", "Petra Barešová", "Amélie Hana Bariteau", "Michaela Bartončíková", "Radek Bartoš", "Aleš Bebčák", "Lucie Beinová", "Gabriela Benešová", "Martin Beránek", "Pavel Bezděk", "Monika Bílková", "Valentina Bímová", "Josef Blažek", "Štěpán Bodnár", "Pavlína Boháčová", "Jitka Brabencová", "Nikola Brandštetterová", "Barbora Brdková", "Miluše Budínová", "Veronika Budínová", "Jan Budjač", "Lucie Burešová", "Vladimíra Bušková", "Martina Býčková", "Martina Cienciala", "Michala Cikhartová", "Helena Císařová", "Hana Culková", "Tereza Čermáková", "Eva Čermáková", "Nikola Černá", "Gabriela Čížková", "Filip Čoudek", "Petr Čvančara", "Martin Dařílek", "Kamila Dohnalová", "Michal Domašík", "Daniel Dopita", "Petra Dudová", "Ondřej Dušek", "Kristýna Dušková", "Stanislav Dvořák", "Kamila Dvořáková", "Dita Michaela Dvouletá", "Lucie Effenbergerová", "Dana Elgrová", "Karolína Elisová", "Zuzana Farkašová", "David Farský", "Jana Fedorčáková", "Filip Fiala", "Lucie Ficzová", "Iveta Fojtíková", "Petr Fousek", "Ondřej Frič", "Veronika Fritschová", "Kristýna Froschová", "Marta Frýdlová", "Michal Gáll", "Anna Gaubmannová", "Filippo Giusti", "Adam Hába", "Iveta Hájková", "Bára Hanelová", "Lucie Harlasová", "Pavel Haška", "Tomáš Havlíček", "Marcela Hegerová", "David Helma", "Pavel Hendrych", "Karolína Henzlová", "Jiří Hnízdil", "Petra Hodná", "Aneta Holakovská", "Iveta Holanová", "Klára Holubová", "Eliška Horáková", "Lucie Hrabová", "Monika Hradecká", "Lenka Hrubá", "Kateřina Hrušková", "Věra Husáková", "Markéta Chládková", "Kateřina Ihnatová", "Alena Jachová", "Kristýna Janatová", "Alena Janošíková", "Alena Jarolímková", "Anna Jelínková", "Petra Jelínková", "Jaroslav Jenček", "Jakub Jeráček", "Lucie Jersáková", "Dominik Jiráň", "Martin John", "Stanislava Kabelková", "Ivana Kaderová", "Klára Kadeřábková", "Pavla Kadlecová", "Jiří Kala", "Vendula Kalužová", "Michal Kaněra", "Dana Kánská", "Daniela Kapusnicová", "Lukáš Karásek", "Blanka Kebrtová", "Chrysavji Kende", "Dita Kilianová", "Petra Kladišovská", "Martin Klouček", "Iveta Klucká", "Lucie Kluzáková", "Petr Knedla", "Jana Koblížková", "Andrea Kočková", "Lukáš Koděra", "Blanka Kolandová", "Pavel Kolář", "Ondřej Komárek", "Pavla Kondrčíková", "Petra Konopková", "Michal Kopačka", "Jakub Koranda", "Andrea Kořínková", "Veronika Kosťová", "Richard Kotásek", "Nikola Koudelková", "Lenka Kovaříková", "Marie Kozáková", "Silvia Krajčiová", "Petr Král", "Hana Královcová", "Tereza Kraupnerová", "Lukáš Krause", "Nathalie Krkošková", "Jan Křenek", "Karolína Křenová", "Michaela Křížová", "Roman Kuba", "Sara Kubátová", "Hana Kubíčková", "Adéla Kubinec Malechová", "Libor Kubiš", "Mira Kučerová", "Berenika Kuchynková", "Josef Kujal", "Aneta Kutalová", "Vít Kyselý", "Kamila Lacinová", "Hana Lakva", "Michaela Langová", "Jitka Lavičková", "Lenka Líbalová", "Jitka Lohniská", "Marie Lorencová", "Lenka Louženská", "Robert Macuľa", "Jaroslav Macura", "Jan Machalica", "Lucie Machatová", "Radka Machová", "Josef Majer", "Engelbert Malina", "Marcela Mandová", "Tereza Marešová", "Petr Martínek", "Petra Martinková", "Veronika Martinková", "Theodor Matějíček", "Michal Materna", "Jana Matoušková", "Jakub Matyáš", "Kateřina Matysová", "Libor Mečl", "Ondřej Menšík", "Kamila Mertová", "Tomáš Micka", "Simona Milotová", "Zuzana Moro", "Jakub Mráz", "Barbara Mrázková", "Veronika Müllerová", "Nikola Müllerová", "Nikola Muráňová", "Ivana Murgašová", "Dominik Nekula", "Dominika Němečková", "Zdeněk Netík", "Jiří Netopil", "Monika Neuhyblová", "Kristýna Neymanová", "Veronika Nezhybová", "Lucie Nosková", "Jakub Novák", "Monika Nováková", "Jindra Nováková", "Jaroslav Obdržálek", "Nikol Obdržálková", "Renata Obrusníková", "Kateřina Oellerich", "Andrij Oseckyj", "Tomáš Palán", "Ingrid Panuška", "Katarína Papajová", "Andrea Papajová", "Dana Pápayová", "Taťána Parýzková", "Tomáš Pavlát", "Michal Pavlica", "Jitka Pavlíčková", "Johana Pavlík Přikrylová", "Ladislav Pazdera", "Martin Pechan", "Jiří Pejcha", "Martin Peroutka", "Nikola Peterková", "Karolína Petrušková Koryntová", "Tra Giang (Veronika) Phamová", "Lucie Pirnusová", "Petr Pohl", "Ilona Pokorná", "Laura Pokorná", "Karíma Pokorná", "Václav Pop", "Eleonora Portná", "Patrik Posselt", "David Potužák", "Tomáš Prachár", "Zuzana Prachárová", "Adam Přibík", "Michal Přibyl", "Lukáš Přívratský", "Matyáš Rajský", "Zdeněk Reibl", "Jana Reiblová", "Renata Reinová", "Ezdráš Ritschel", "Petra Rosenkrancová", "Kateřina Rounová", "Monika Rubriciusová", "Naděžda Růžičková", "Jan Ryba", "Petra Rydlová", "Veronika Rýnová", "Sylva Řeháková", "Tereza Řehořová", "Karina Řezáčová", "Ivana Sasková", "Petra Sedláčková", "Petr Sejval", "Michaela Sekaninová", "Petra Sellner", "Tereza Sifferlen", "Ivana Singerová", "Aneta Sládková", "Adéla Slámová", "Kateřina Smičková", "Nikola Smith", "Adam Smolka", "Kateřina Smolová", "Petr Soukup", "Lukáš Soukup", "Kristýna Spěváková", "Michaela Srbová", "Gabriela Srbová", "Věra Srdečná", "Tomáš Staněk", "Veronika Staňková", "Lucie Staruchová", "Kateřina Stiborová", "Lucie Stolařová", "Monika Streitová", "Heda Suchanová", "Patrik Svoboda", "Adam Svoboda", "Eliška Svobodová", "Tereza Svobodová", "Ivana Šafaříková", "Jitka Šatavová", "Marcela Šedinová", "Jan Šefčák", "Adam Šenkýř", "Zuzana Šenkýřová", "Lucia Šimánková", "Jana Šimková", "Jan Šimůnek", "Dagmar Šiplová", "Michaela Šiřinová", "Miroslav Škarda", "Kateřina Škrobánková", "Milan Šortner", "Pavel Špringel", "Jaromír Šubrt", "Kateřina Šubrtová", "Jan Šula", "Jana Šuterová", "Jana Švecová", "Pavlína Švehlová", "Jiří Technik", "Marek Tíkal", "Nikola Tomanová", "Lucie Topičová", "Michal Truxa", "Jana Ullrichová", "Jitka Urbanová", "Dominika Urbanová", "Ivana Vacková", "Veronika Valentová", "Jan Váňa", "Jiří Vaněček", "Lada Vašíčková", "Michal Vaverka", "Michaela Vernerová", "Jitka Veselá", "Iveta Vinniková", "Andrea Vítová", "Jiří Vlček", "Alena Vojtová", "Veronika Volf", "Pavel Volf", "Dana Volfová", "Daniela Volná", "Kateřina Vopičková", "Michal Vránek", "Kamila Vránová", "Martin Všechovský", "Tereza Vychytilová", "Pavla Vypiorová", "Zuzana Vystydová", "Jitka Wolfgruber", "Lucie Zachová", "Jana Zálešáková", "Tomáš Zedník", "Dana Zehrerová", "Tomáš Zelený", "Martina Zemánková", "Andrea Zhýbalová", "Jan Zoul", "Martina Žáková", "Michaela Žitná", "Jitka Žižková"];
const skyPoints=employeeNames.map((name,i)=>{const g=2.399963229728653,theta=i*g,r=Math.sqrt((i+.5)/employeeNames.length);return {name,x:50+43*r*Math.cos(theta),y:50+42*r*Math.sin(theta)}});
let chosen=[];
function normalizeName(value){return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('cs')}
function filterNames(){
 const q=normalizeName($('star-search').value.trim()),box=$('star-results'),scroll=box.scrollTop;
 const results=employeeNames.map((n,i)=>({n,i})).filter(x=>normalizeName(x.n).includes(q));
 box.replaceChildren(...results.map(({n,i})=>{const b=document.createElement('button');b.type='button';b.className='star-result';b.textContent=n;b.setAttribute('aria-pressed',String(chosen.includes(i)));b.onclick=()=>selectStar(i);return b}));
 if(!results.length){const p=document.createElement('p');p.className='no-results';p.textContent='Tomuto hledání neodpovídá žádné jméno.';box.append(p)}
 box.scrollTop=scroll;$('star-result-count').textContent=(q?'Nalezeno '+results.length+' z '+employeeNames.length:'Všech '+employeeNames.length+' kolegů')+' · vybráno '+chosen.length;
}
function drawStars(){const field=$('star-field');field.querySelectorAll('.sky-star').forEach(x=>x.remove());const frag=document.createDocumentFragment();skyPoints.forEach((p,i)=>{let b=document.createElement('button');b.type='button';b.className='sky-star';b.dataset.index=i;b.style.left=p.x+'%';b.style.top=p.y+'%';b.title=p.name;b.setAttribute('aria-label',p.name);b.setAttribute('aria-pressed',String(chosen.includes(i)));if(chosen.includes(i))b.dataset.label=p.name;b.onclick=()=>selectStar(i);frag.appendChild(b)});field.appendChild(frag);const svg=$('star-lines');svg.replaceChildren();for(let j=1;j<chosen.length;j++){let a=skyPoints[chosen[j-1]],b=skyPoints[chosen[j]];let line=document.createElementNS('http://www.w3.org/2000/svg','line');for(const [key,value] of Object.entries({x1:a.x*10,y1:a.y*5.2,x2:b.x*10,y2:b.y*5.2,stroke:'#f5cd82','stroke-width':2.5,'stroke-linecap':'round'}))line.setAttribute(key,value);svg.appendChild(line)}$('sky-selected-count').textContent=chosen.length+' vybraných';const list=$('selected-stars');list.replaceChildren();if(!chosen.length){list.textContent='Vyber hvězdy kliknutím nebo vyhledáváním.'}else chosen.forEach(i=>{let b=document.createElement('button');b.type='button';b.className='star-chip';b.textContent=skyPoints[i].name+' ×';b.title='Odebrat '+skyPoints[i].name;b.onclick=()=>selectStar(i);list.appendChild(b)});filterNames();renderSelectionMap()}
function selectStar(i){if(chosen.includes(i))chosen=chosen.filter(v=>v!==i);else chosen.push(i);drawStars()}
$('toggle-star-map').onclick=()=>{const all=$('star-field').classList.toggle('show-all');$('toggle-star-map').setAttribute('aria-pressed',String(all));$('toggle-star-map').textContent=all?'Jen moje souhvězdí':'Zobrazit všech 347'};
$('show-my-stars').onclick=()=>{$('star-field').classList.remove('show-all');$('toggle-star-map').setAttribute('aria-pressed','false');$('toggle-star-map').textContent='Zobrazit všech 347';document.querySelector('.sky-main').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'})};
$('star-search').oninput=()=>{$('star-results').scrollTop=0;filterNames()};$('clear-stars').onclick=()=>{chosen=[];drawStars()};$('random-stars').onclick=()=>{chosen=[];while(chosen.length<5){const i=Math.floor(Math.random()*employeeNames.length);if(!chosen.includes(i))chosen.push(i)}drawStars()};$('print-stars').onclick=printConstellation;$('sky-total').textContent=String(employeeNames.length);
// Responsive canvas runner, fixed virtual world independent of screen size.
const board=$('game-board'),canvas=$('runner-canvas'),ctx=canvas.getContext('2d');const WORLD_W=960,WORLD_H=420;let run={state:'idle',distance:0,score:0,saved:0,best:0,last:0,vy:0,py:0,obstacles:[],buttons:[],spawn:0,bonusSpawn:0,flakes:[]};try{run.best=Number(localStorage.getItem('pf2027_karat_best')||0)||0}catch(e){}$('best').textContent=run.best;
for(let i=0;i<48;i++)run.flakes.push({x:(i*139)%960,y:(i*83)%420,r:1+i%3,speed:12+i%5*8});
function updateCanvasSize(){const rect=canvas.getBoundingClientRect();const dpr=Math.min(2,window.devicePixelRatio||1);canvas.width=Math.max(2,Math.round(rect.width*dpr));canvas.height=Math.max(2,Math.round(rect.height*dpr));ctx.setTransform(canvas.width/WORLD_W,0,0,canvas.height/WORLD_H,0,0);paintGame()}
const ro=new ResizeObserver(updateCanvasSize);ro.observe(canvas);
function roundRect(x,y,w,h,r,color){ctx.fillStyle=color;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill()}
function paintGame(){ctx.clearRect(0,0,960,420);let sky=ctx.createLinearGradient(0,0,0,420);sky.addColorStop(0,'#0a203b');sky.addColorStop(1,'#1b5278');ctx.fillStyle=sky;ctx.fillRect(0,0,960,420);ctx.fillStyle='#fff3c4';ctx.beginPath();ctx.arc(826,72,35,0,Math.PI*2);ctx.fill();// Distant skyline and main street share fixed, continuous ground planes.
for(let i=0;i<18;i++){const x=((i*90-run.distance*.08)%1620+1620)%1620-90,h=55+(i*37)%100;roundRect(x,326-h,78,h,2,'#102c48')}
for(let i=0;i<16;i++){const x=((i*100-run.distance*.24)%1600+1600)%1600-100,h=90+(i*31)%100;roundRect(x,354-h,90,h,3,i%2?'#234762':'#2c526e');roundRect(x-2,354-h,94,6,2,'#dfedf3');for(let wy=354-h+18;wy<340;wy+=26){for(let wx=x+13;wx<x+80;wx+=23){roundRect(wx,wy,10,13,1,'#efce8d')}}ctx.strokeStyle='#e9c46c';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,354-h+8);ctx.quadraticCurveTo(x+45,354-h+24,x+90,354-h+8);ctx.stroke()}
for(let i=0;i<6;i++){const x=((i*260-run.distance*.55)%1560+1560)%1560-90;roundRect(x,239,5,115,2,'#101f36');roundRect(x-10,230,25,21,4,'#f8df9e');ctx.fillStyle='#f8df9e18';ctx.beginPath();ctx.arc(x+2,241,35,0,Math.PI*2);ctx.fill()}
for(let f of run.flakes){let x=f.x-(run.distance*.04)%960;if(x<0)x+=960;ctx.fillStyle='#ffffff99';ctx.beginPath();ctx.arc(x,f.y,f.r,0,Math.PI*2);ctx.fill()}ctx.fillStyle='#e8f0f4';ctx.fillRect(0,354,960,66);ctx.fillStyle='#9bc1d2';ctx.fillRect(0,353,960,6);ctx.fillStyle='#294d68';ctx.fillRect(0,390,960,30);for(let i=0;i<20;i++){let x=i*60-run.distance%60;ctx.fillStyle='#a1bdd0';ctx.fillRect(x,379,26,3)}// protagonist
const x=190,feet=354-run.py;ctx.save();ctx.translate(x,feet);let bob=run.py>0?0:-Math.abs(Math.sin(run.distance*.04))*2;ctx.translate(0,bob);ctx.fillStyle='#172c4c';ctx.beginPath();const stride=run.py>0?0:Math.sin(run.distance*.05)*10;ctx.ellipse(-14+stride,-7,15,7,0,0,Math.PI*2);ctx.ellipse(15-stride,-7,15,7,0,0,Math.PI*2);ctx.fill();roundRect(-27,-69,55,60,15,'#326ca3');ctx.fillStyle='#d4e7ff';ctx.font='bold 18px sans-serif';ctx.textAlign='center';ctx.fillText('R',0,-33);ctx.fillStyle='#f5c99d';ctx.beginPath();ctx.arc(0,-88,26,0,Math.PI*2);ctx.fill();ctx.fillStyle='#142b42';ctx.fillRect(-25,-103,50,10);ctx.fillStyle='#bb3d52';ctx.beginPath();ctx.moveTo(-30,-105);ctx.quadraticCurveTo(-13,-158,16,-141);ctx.quadraticCurveTo(35,-133,25,-105);ctx.fill();ctx.fillStyle='#fff';ctx.fillRect(-30,-109,57,9);ctx.beginPath();ctx.arc(21,-135,9,0,Math.PI*2);ctx.fill();ctx.restore();
for(const o of run.obstacles){let ox=o.x,y=354;roundRect(ox,y-78,78,70,10,'#273d5a');roundRect(ox+6,y-72,66,47,5,'#d3e9fc');roundRect(ox+12,y-66,54,35,5,'#1b5081');ctx.fillStyle='#e8f5ff';ctx.textAlign='center';ctx.font='bold 17px sans-serif';ctx.fillText('KARAT',ox+39,y-45);roundRect(ox+34,y-8,10,9,2,'#71839a');const stride=Math.sin(run.distance*.042+ox*.025)*12;ctx.strokeStyle='#e2b96a';ctx.lineWidth=6;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(ox+25,y-8);ctx.lineTo(ox+20+stride,y+2);ctx.moveTo(ox+55,y-8);ctx.lineTo(ox+58-stride,y+2);ctx.stroke();ctx.fillStyle='#fff';ctx.font='20px sans-serif';ctx.fillText('⌁',ox+39,y-81)}
for(const b of run.buttons){roundRect(b.x,b.y,103,48,11,'#2483dc');ctx.strokeStyle='#b6dcff';ctx.lineWidth=3;ctx.strokeRect(b.x+4,b.y+4,95,40);ctx.fillStyle='#fff';ctx.font='bold 21px sans-serif';ctx.textAlign='center';ctx.fillText('Uložit',b.x+52,b.y+31)}
}
function gameStatus(txt){$('game-status').textContent=txt}
function showOverlay(title,desc,button){$('game-overlay').hidden=false;$('game-overlay-title').textContent=title;$('game-overlay-desc').textContent=desc;$('start-game').textContent=button}
let runPreparing=false;
async function beginGame(){if(runPreparing)return;runPreparing=true;$('start-game').disabled=true;cancelAnimationFrame(gameId);run.state='preparing';try{await window.onRunStart?.('runner')}finally{runPreparing=false;$('start-game').disabled=false}if(activeView!=='game'){run.state='idle';return}run={...run,state:'running',distance:0,score:0,saved:0,last:0,vy:0,py:0,obstacles:[],buttons:[],spawn:.5,bonusSpawn:1.7};$('game-overlay').hidden=true;$('pause-game').disabled=false;$('pause-game').textContent='Pauza';$('score').textContent=0;$('saved').textContent=0;gameStatus('Přeskoč KARAT. Sbírej Uložit!');gameId=requestAnimationFrame(gameLoop)}
function jump(){if(run.state==='idle'||run.state==='over'){beginGame();return}if(run.state==='paused'){resumeGame();return}if(run.state==='running'&&run.py<=1){run.vy=690;gameStatus('Skok!')}}
function pauseGame(){if(run.state==='running'){cancelAnimationFrame(gameId);run.state='paused';$('pause-game').textContent='Pokračovat';gameStatus('Pauza');showOverlay('Pauza','Hra počká, až budeš připravený.','Začít znovu')}else if(run.state==='paused')resumeGame()}
function resumeGame(){if(run.state!=='paused')return;run.state='running';run.last=0;$('game-overlay').hidden=true;$('pause-game').textContent='Pauza';gameStatus('Přeskoč KARAT. Sbírej Uložit!');gameId=requestAnimationFrame(gameLoop)}
function finishGame(){run.score=Math.floor(run.distance/30)+run.saved*25;$('score').textContent=run.score;window.onRunEnd?.('runner',run.score,{distance:run.distance,saved:run.saved});run.state='over';$('pause-game').disabled=true;showOverlay('KARAT tě doběhl!','Skóre: '+run.score+' · Uloženo: '+run.saved,'↻ Hrát znovu');gameStatus('Konec hry — zkus to ještě jednou.');if(run.score>run.best){run.best=run.score;$('best').textContent=run.best;try{localStorage.setItem('pf2027_karat_best',String(run.best))}catch(e){}}}
function gameLoop(now){if(run.state!=='running')return;if(!run.last)run.last=now;const dt=Math.min(.04,(now-run.last)/1000);run.last=now;const speed=Math.min(580,250+run.distance*.015);run.distance+=speed*dt;run.vy-=1800*dt;run.py=Math.max(0,run.py+run.vy*dt);if(!run.py)run.vy=0;run.spawn-=dt;if(run.spawn<=0){run.obstacles.push({x:1020});run.spawn=1.5+Math.random()*.75-Math.min(.4,run.distance/12000)}run.bonusSpawn-=dt;if(run.bonusSpawn<=0){run.buttons.push({x:1040,y:185+Math.random()*25});run.bonusSpawn=1.8+Math.random()*1.3}for(let o of run.obstacles)o.x-=speed*dt;for(let b of run.buttons)b.x-=speed*dt;run.obstacles=run.obstacles.filter(o=>o.x>-110);run.buttons=run.buttons.filter(b=>b.x>-120);const playerBox={x:166,y:354-run.py-110,w:49,h:105};for(const o of run.obstacles){if(playerBox.x+playerBox.w-10>o.x+9&&playerBox.x+12<o.x+68&&playerBox.y+playerBox.h-12>354-78&&playerBox.y+14<354-5){paintGame();finishGame();return}}for(let i=run.buttons.length-1;i>=0;i--){let b=run.buttons[i];if(playerBox.x+playerBox.w>b.x&&playerBox.x<b.x+103&&playerBox.y+playerBox.h>b.y&&playerBox.y<b.y+48){run.buttons.splice(i,1);run.saved++;run.score+=25;gameStatus('Uloženo! +25 ✦')}}run.score=Math.floor(run.distance/30)+run.saved*25;$('score').textContent=run.score;$('saved').textContent=run.saved;paintGame();gameId=requestAnimationFrame(gameLoop)}
$('start-game').onclick=beginGame;$('jump-game').onclick=jump;$('pause-game').onclick=pauseGame;board.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;e.preventDefault();jump()});document.addEventListener('visibilitychange',()=>{if(document.hidden&&run.state==='running')pauseGame()});
renderStory();nav(location.hash.slice(1)||'home');window.addEventListener('hashchange',()=>nav(location.hash.slice(1)||'home'));

const snowToggle=document.getElementById('snow-toggle');snowToggle.addEventListener('click',()=>{const paused=document.body.classList.toggle('no-snow');snowToggle.setAttribute('aria-pressed',String(!paused));snowToggle.querySelector('span').textContent=paused?'Nesněží':'Sněží'});
(function(){
  const audio=document.getElementById('scene-audio');
  const volume=document.getElementById('volume');
  if(audio&&volume){audio.volume=Number(volume.value||0.85); volume.addEventListener('input',()=>audio.volume=Number(volume.value||0.85));}

})();

/* Interaktivní vánoční stromek — lokální aktivita bez dalších závislostí */
(function(){
 const stage=document.getElementById('xmas-experience');if(!stage)return;
 const lights=[...stage.querySelectorAll('[data-xmas-light]')],message=document.getElementById('xmas-message'),count=document.getElementById('xmas-count');
 const wishes=['Ať máš v novém roce víc radosti než otevřených e-mailů.','Přejeme ti Vánoce bez jediného urgentního úkolu.','Ať je rok 2027 plný příjemných překvapení!'];
 let active=new Set(),opened=new Set();
 function update(){count.textContent=active.size+' / 5 světýlek';stage.classList.toggle('celebrate',active.size===lights.length);if(active.size===lights.length && !opened.size){message.textContent='✨ Stromeček září! Teď otevři jeden ze tří dárků.';}}
 lights.forEach((button,i)=>button.addEventListener('click',()=>{if(active.has(i)){active.delete(i);button.setAttribute('aria-pressed','false')}else{active.add(i);button.setAttribute('aria-pressed','true');message.textContent='Rozsvíceno! Ještě '+(lights.length-active.size)+' světýlek.';}update()}));
 document.getElementById('xmas-lights')?.addEventListener('click',()=>{lights.forEach((b,i)=>{active.add(i);b.setAttribute('aria-pressed','true')});update()});
 stage.querySelectorAll('[data-xmas-gift]').forEach((button,i)=>button.addEventListener('click',()=>{if(active.size<lights.length){message.textContent='Nejdřív rozsvíť všech pět ozdob. 🎄';return;}opened.add(i);button.style.filter='brightness(1.35)';message.textContent='🎁 '+wishes[i];}));
 document.getElementById('xmas-reset')?.addEventListener('click',()=>{active.clear();opened.clear();lights.forEach(b=>b.setAttribute('aria-pressed','false'));stage.querySelectorAll('[data-xmas-gift]').forEach(b=>b.style.filter='');message.textContent='Rozsviť všech pět ozdob. Potom otevři dárek! 🎁';update();});
 update();
})();

// Uniform icons and navigation labels.
document.querySelectorAll('.dock-item').forEach(b=>{b.querySelector('span').innerHTML=icon(b.dataset.nav)});
for(const [id,name] of [['prev','prev'],['next','next'],['story-stop','stop']])$(id).innerHTML=icon(name);
document.querySelectorAll('.activity-card').forEach(b=>{b.querySelector('.activity-symbol').innerHTML=icon(b.dataset.nav)});
// Shared leaderboard: only a confirmed API response is reported as saved.
const onlinePanel=document.querySelector('.leaderboard-panel');
let runnerSession=null,finishedResult=null,recentScoreId=null;
const boardNote=message=>onlinePanel.querySelector('.leaderboard-note').textContent=message;
const saveButton=onlinePanel.querySelector('button');
onlinePanel.querySelector('h2').textContent='TOP 10 · Vánoční běh';
onlinePanel.querySelector('.mini-copy').textContent='Nejlepší výsledek každé přezdívky. Při shodě rozhoduje dřívější zápis.';
onlinePanel.querySelector('input').setAttribute('aria-label','Přezdívka hráče');
saveButton.disabled=true;saveButton.onclick=saveOnlineResult;
async function scoreApi(path,options={}){
 let response;try{response=await fetch('/api/'+path,{...options,credentials:'same-origin',headers:{'Content-Type':'application/json'},signal:AbortSignal.timeout(12000)})}catch{throw Error('Připojení k žebříčku není dostupné. Zkus to za chvíli.')}
 let data;try{data=await response.json()}catch{throw Error('Serverové API není nasazené. Nahraj celý nový balíček, včetně složky api.')}
 if(!response.ok)throw Error(data.error||'Výsledek teď nelze uložit.');return data;
}
async function refreshOnlineBoard(showStatus=true){
 try{
  const data=await scoreApi('leaderboard');if(!Array.isArray(data.rows))throw Error('Neplatná odpověď žebříčku.');
  const tbody=onlinePanel.querySelector('tbody');tbody.replaceChildren();
  if(!data.rows.length){const cell=tbody.insertRow().insertCell();cell.colSpan=4;cell.textContent='Zatím žádný výsledek. Buď první!'}
  data.rows.forEach((r,i)=>{const tr=tbody.insertRow();if(r.id===recentScoreId)tr.classList.add('my-result');[i+1,r.nickname,r.score,new Date(r.created_at).toLocaleDateString('cs-CZ')].forEach(value=>tr.insertCell().textContent=value)});
  if(showStatus)boardNote('Společný žebříček · výsledky uložené v databázi Supabase');return true;
 }catch(e){if(showStatus)boardNote(e.message);return false}
}
window.onRunStart=async()=>{
 runnerSession=null;finishedResult=null;saveButton.disabled=true;boardNote('Připravuji herní pokus…');
 try{runnerSession=await scoreApi('session',{method:'POST',body:'{}'});boardNote('Po dohrání můžeš výsledek uložit do společného žebříčku.')}
 catch(e){boardNote(e.message+' Hrát můžeš, tento pokus se ale neuloží.');}
};
window.onRunEnd=(game,score,metadata)=>{
 if(game!=='runner')return;
 if(!runnerSession){saveButton.disabled=true;return}
 finishedResult={score,metadata,token:runnerSession.token};saveButton.disabled=false;boardNote('Hotovo: '+score+' bodů. Vyplň přezdívku a klikni na Uložit skóre.');
};
async function saveOnlineResult(){
 const result=finishedResult;if(!result)return;
 const nickname=onlinePanel.querySelector('input').value.trim();
 if(!/^[\p{L}\p{N} ._-]{2,32}$/u.test(nickname)){boardNote('Přezdívka musí mít 2–32 písmen, číslic, mezer, teček nebo pomlček.');onlinePanel.querySelector('input').focus();return}
 saveButton.disabled=true;boardNote('Ukládám výsledek…');
 try{const data=await scoreApi('score',{method:'POST',body:JSON.stringify({...result,nickname})});recentScoreId=data.id;if(finishedResult===result)finishedResult=null;const refreshed=await refreshOnlineBoard(false);boardNote(refreshed?'Výsledek byl uložen do databáze.':'Výsledek byl uložen. Žebříček se teď nepodařilo obnovit; načti stránku znovu.')}
 catch(e){boardNote(e.message);if(finishedResult===result)saveButton.disabled=false}
}
refreshOnlineBoard();

// Drag selected stars while retaining their original employee identities.
let draggingStar=null,suppressStarClick=false;
$('star-field').addEventListener('pointerdown',e=>{const b=e.target.closest('.sky-star');if(!b)return;const i=Number(b.dataset.index);if(!Number.isInteger(i))return;draggingStar={i,x:e.clientX,y:e.clientY,moved:false};b.setPointerCapture(e.pointerId)});
$('star-field').addEventListener('pointermove',e=>{if(!draggingStar)return;const d=draggingStar;if(Math.hypot(e.clientX-d.x,e.clientY-d.y)<6&&!d.moved)return;d.moved=true;const r=$('star-field').getBoundingClientRect(),p=skyPoints[d.i];p.x=Math.max(7,Math.min(93,(e.clientX-r.left)/r.width*100));p.y=Math.max(8,Math.min(90,(e.clientY-r.top)/r.height*100));const b=e.target.closest('.sky-star');if(b){b.style.left=p.x+'%';b.style.top=p.y+'%'}const svg=$('star-lines');svg.replaceChildren();for(let j=1;j<chosen.length;j++){const a=skyPoints[chosen[j-1]],z=skyPoints[chosen[j]],l=document.createElementNS('http://www.w3.org/2000/svg','line');Object.entries({x1:a.x*10,y1:a.y*5.2,x2:z.x*10,y2:z.y*5.2,stroke:'#f5cd82','stroke-width':2.5}).forEach(([k,v])=>l.setAttribute(k,v));svg.append(l)}});
function finishStarDrag(){if(draggingStar?.moved){if(!chosen.includes(draggingStar.i))chosen.push(draggingStar.i);suppressStarClick=true;drawStars();setTimeout(()=>suppressStarClick=false,0)}draggingStar=null}
$('star-field').addEventListener('pointerup',finishStarDrag);$('star-field').addEventListener('pointercancel',finishStarDrag);
$('star-field').addEventListener('click',e=>{if(suppressStarClick){e.preventDefault();e.stopImmediatePropagation()}},true);
// Shared layout keeps the selected constellation framed at every screen size.
function selectionLayout(width,height,padding=65){
 if(!chosen.length)return [];
 const points=chosen.map(i=>({...skyPoints[i],i})),minX=Math.min(...points.map(p=>p.x)),maxX=Math.max(...points.map(p=>p.x)),minY=Math.min(...points.map(p=>p.y)),maxY=Math.max(...points.map(p=>p.y));
 const scale=Math.min((width-2*padding)/Math.max(30,maxX-minX),(height-2*padding)/Math.max(25,maxY-minY));
 return points.map(p=>({...p,x:width/2+(p.x-(minX+maxX)/2)*scale,y:height/2+(p.y-(minY+maxY)/2)*scale}));
}
function svgNode(parent,tag,attrs={},text){const el=document.createElementNS('http://www.w3.org/2000/svg',tag);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,String(v)));if(text!==undefined)el.textContent=text;parent.append(el);return el}
function constellationLabels(svg,points,width,height,size,offsetX=0,offsetY=0){
 const measure=document.createElement('canvas').getContext('2d');measure.font='500 '+size+'px Arial';const occupied=[];
 points.forEach(p=>{
  const w=Math.min(width-16,measure.measureText(p.name).width+18),h=size+15;
  const opts=[];for(const gap of [14,40,70,105])for(const [dx,dy] of [[gap,-h/2],[-w-gap,-h/2],[-w/2,gap],[-w/2,-h-gap]])opts.push({x:Math.max(8,Math.min(width-w-8,p.x+dx)),y:Math.max(8,Math.min(height-h-8,p.y+dy)),w,h});
  const cost=r=>occupied.reduce((v,b)=>v+Math.max(0,Math.min(r.x+r.w,b.x+b.w)-Math.max(r.x,b.x))*Math.max(0,Math.min(r.y+r.h,b.y+b.h)-Math.max(r.y,b.y)),0)*100+Math.hypot(r.x+r.w/2-p.x,r.y+r.h/2-p.y);
  opts.sort((a,b)=>cost(a)-cost(b));const r=opts[0];occupied.push(r);
  const x=p.x+offsetX,y=p.y+offsetY;
  svgNode(svg,'line',{x1:x,y1:y,x2:offsetX+Math.max(r.x,Math.min(r.x+w,p.x)),y2:offsetY+Math.max(r.y,Math.min(r.y+h,p.y)),stroke:'#c9ae7d','stroke-width':.8,opacity:.65});
  svgNode(svg,'circle',{cx:x,cy:y,r:12,fill:'#e6c78c',opacity:.12});svgNode(svg,'circle',{cx:x,cy:y,r:4,fill:'#fff1c5'});
  svgNode(svg,'rect',{x:r.x+offsetX,y:r.y+offsetY,width:w,height:h,rx:7,fill:'#102b43','fill-opacity':.94,stroke:'#dec998','stroke-opacity':.18});
  svgNode(svg,'text',{x:r.x+offsetX+9,y:r.y+offsetY+size+3,fill:'#fff5df','font-family':'Arial,sans-serif','font-size':size,'font-weight':500},p.name);
 });
}
function renderSelectionMap(){
 const field=$('star-field');field.querySelector('.selection-map')?.remove();const width=Math.max(280,Math.round(field.clientWidth||600)),height=width<500?370:470;
 const svg=svgNode(field,'svg',{class:'selection-map',viewBox:'0 0 '+width+' '+height,role:'img','aria-label':chosen.length?'Souhvězdí vybraných kolegů':'Vyber kolegy ze seznamu pod mapou'});
 if(!chosen.length){svgNode(svg,'text',{x:width/2,y:height/2-15,'text-anchor':'middle',fill:'#e8cd9a','font-size':32},'✧');svgNode(svg,'text',{x:width/2,y:height/2+22,'text-anchor':'middle',fill:'#d2deea','font-family':'Arial,sans-serif','font-size':14},'Tady se rozsvítí tvoje parta.');return}
 const points=selectionLayout(width,height,width<500?60:85);
 svgNode(svg,'polyline',{points:points.map(p=>p.x+','+p.y).join(' '),fill:'none',stroke:'#efd29c','stroke-width':1.6,'stroke-linejoin':'round'});
 constellationLabels(svg,points,width,height,chosen.length>25?10:width<500?12:15);
}
new ResizeObserver(()=>{if(activeView==='stars')renderSelectionMap()}).observe($('star-field'));
function constellationSVG(){
 const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');Object.entries({xmlns:'http://www.w3.org/2000/svg',viewBox:'0 0 1200 848',role:'img','aria-label':'Vánoční hvězdná mapa RESPECTu se jmény vybraných kolegů'}).forEach(([k,v])=>svg.setAttribute(k,v));
 const n=(tag,attrs,text)=>svgNode(svg,tag,attrs,text),defs=n('defs',{});
 const bg=svgNode(defs,'radialGradient',{id:'winter-nebula',cx:'25%',cy:'70%',r:'90%'});svgNode(bg,'stop',{offset:'0%','stop-color':'#22576b'});svgNode(bg,'stop',{offset:'55%','stop-color':'#122b46'});svgNode(bg,'stop',{offset:'100%','stop-color':'#091629'});
 n('rect',{width:1200,height:848,fill:'#f8f3e8'});n('rect',{x:18,y:18,width:1164,height:812,rx:12,fill:'none',stroke:'#c8a568','stroke-width':1});
 n('text',{x:55,y:64,fill:'#365066','font-family':'Arial,sans-serif','font-size':12,'letter-spacing':3},'RESPECT / VÁNOČNÍ HVĚZDNÁ MAPA');
 n('text',{x:1144,y:67,fill:'#aa8347','font-family':'Georgia,serif','font-size':28,'text-anchor':'end'},'PF 2027');
 n('text',{x:56,y:136,fill:'#112d45','font-family':'Georgia,serif','font-size':57},'Každý z nás je hvězda.');
 n('text',{x:58,y:182,fill:'#61717c','font-family':'Arial,sans-serif','font-size':19},'Společně tvoříme souhvězdí, které má svůj příběh.');
 n('rect',{x:44,y:219,width:1112,height:460,rx:24,fill:'url(#winter-nebula)'});
 for(let i=0;i<145;i++){const x=60+(i*613.7)%1080,y=235+(i*137.9)%425;n('circle',{cx:x,cy:y,r:i%11===0?1.7:.8,fill:i%3?'#c9deeb':'#f1d6a5',opacity:.18+(i%5)*.1})}
 for(const r of [180,290,400])n('circle',{cx:270,cy:460,r,fill:'none',stroke:'#9fb9cb','stroke-width':.6,'stroke-opacity':.12});
 const points=selectionLayout(1064,420,100);n('polyline',{points:points.map(p=>(p.x+68)+','+(p.y+239)).join(' '),fill:'none',stroke:'#e5c589','stroke-width':2,'stroke-linejoin':'round'});
 constellationLabels(svg,points,1064,420,chosen.length>40?11:chosen.length>20?15:21,68,239);
 n('text',{x:64,y:724,fill:'#9d793e','font-family':'Arial,sans-serif','font-size':11,'letter-spacing':2},'NAŠE PARTA / '+chosen.length+' '+(chosen.length===1?'HVĚZDA':chosen.length<5?'HVĚZDY':'HVĚZD'));
 n('text',{x:64,y:763,fill:'#18354b','font-family':'Georgia,serif','font-size':27},'Ty nejhezčí věci vznikají mezi lidmi.');
 n('text',{x:64,y:795,fill:'#657786','font-family':'Arial,sans-serif','font-size':14},'Krásné Vánoce a nový rok plný společných zážitků.');
 n('text',{x:1125,y:789,fill:'#c2a269','font-family':'Georgia,serif','font-size':91,'font-style':'italic','text-anchor':'end',opacity:.62},'r');
 return svg;
}
function prepareConstellationPrint(){document.body.classList.add('constellation-printing');const target=$('constellation-print');target.replaceChildren(constellationSVG());return target}
function printConstellation(){if(!chosen.length){toast('Nejdřív vyber alespoň jednu hvězdu');return}prepareConstellationPrint();window.print()}
window.addEventListener('beforeprint',()=>{if(activeView==='stars')prepareConstellationPrint();else document.body.classList.remove('constellation-printing')});window.addEventListener('afterprint',()=>document.body.classList.remove('constellation-printing'));
const exportButton=document.createElement('button');exportButton.className='btn secondary';exportButton.textContent='Stáhnout souhvězdí (SVG)';exportButton.onclick=()=>{if(!chosen.length){toast('Nejdřív vyber alespoň jednu hvězdu');return}const url=URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(constellationSVG())],{type:'image/svg+xml;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='RESPECT-souhvezdi-PF2027.svg';a.click();setTimeout(()=>URL.revokeObjectURL(url),1500)};document.querySelector('.sky-actions').append(exportButton);

const narrationCues={"1": [0.0, 3.12, 6.65, 10.12], "2": [0.0, 3.88, 7.99, 11.67], "3": [0.0, 4.16, 8.29, 11.625], "4": [0.0, 4.68, 8.95, 12.815], "5": [0.0, 3.63, 7.27, 11.365], "6": [0.0, 3.65, 7.6, 11.015], "7": [0.0, 3.06, 6.89, 10.565], "8": [0.0, 3.73, 7.42, 11.166], "9": [0.0, 3.22, 7.12, 11.32], "10": [0.0, 3.84, 7.76, 11.76], "11": [0.0, 4.02, 8.18, 12.29], "12": [0.0, 3.15, 6.34, 10.94]};
function highlightReading(){const cues=narrationCues[String(sceneIndex+1)];let current=0;for(let i=0;i<cues.length;i++)if(storyAudio.currentTime>=cues[i])current=i;document.querySelectorAll('#verse .verse-line').forEach((el,i)=>el.classList.toggle('is-reading',voice&&i===current))}
storyAudio.addEventListener('timeupdate',highlightReading);storyAudio.addEventListener('pause',()=>{document.querySelectorAll('#verse .verse-line').forEach(el=>el.classList.remove('is-reading'))});

// A standalone print PDF also works when a browser blocks its print dialog.
async function downloadConstellationPDF(){
 if(!chosen.length){toast('Nejdřív vyber alespoň jednu hvězdu');return}
 const button=$('download-stars-pdf');button.disabled=true;
 let source;
 try{
  const svg=new XMLSerializer().serializeToString(constellationSVG());
  source=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml;charset=utf-8'}));
  const picture=new Image();await new Promise((resolve,reject)=>{picture.onload=resolve;picture.onerror=reject;picture.src=source});
  const canvas=document.createElement('canvas');canvas.width=2400;canvas.height=1696;canvas.getContext('2d').drawImage(picture,0,0,canvas.width,canvas.height);
  const pictureBlob=await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg',.95));if(!pictureBlob)throw Error('Nelze vytvořit PDF.');
  const jpeg=new Uint8Array(await pictureBlob.arrayBuffer()),encoder=new TextEncoder(),parts=[],offsets=[0];let size=0;
  const add=value=>{const bytes=typeof value==='string'?encoder.encode(value):value;parts.push(bytes);size+=bytes.length};
  const object=(id,content)=>{offsets[id]=size;add(id+' 0 obj\n');add(content);add('\nendobj\n')};
  add('%PDF-1.4\n');
  object(1,'<< /Type /Catalog /Pages 2 0 R >>');
  object(2,'<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
  object(3,'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 841.89 595.28] /Resources << /XObject << /Image1 4 0 R >> >> /Contents 5 0 R >>');
  offsets[4]=size;add('4 0 obj\n<< /Type /XObject /Subtype /Image /Width 2400 /Height 1696 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length '+jpeg.length+' >>\nstream\n');add(jpeg);add('\nendstream\nendobj\n');
  const commands='q\n841.89 0 0 595.28 0 0 cm\n/Image1 Do\nQ\n';object(5,'<< /Length '+encoder.encode(commands).length+' >>\nstream\n'+commands+'endstream');
  const xref=size;add('xref\n0 6\n0000000000 65535 f \n');for(let i=1;i<=5;i++)add(String(offsets[i]).padStart(10,'0')+' 00000 n \n');add('trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n'+xref+'\n%%EOF\n');
  const url=URL.createObjectURL(new Blob(parts,{type:'application/pdf'})),link=document.createElement('a');link.href=url;link.download='RESPECT-souhvezdi-PF2027.pdf';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),5000);toast('PDF je připravené ke stažení.');
 }catch(e){toast('PDF se nepodařilo vytvořit. Použij tisk nebo stažení SVG.')}finally{if(source)URL.revokeObjectURL(source);button.disabled=false}
}
const pdfButton=document.createElement('button');pdfButton.id='download-stars-pdf';pdfButton.className='btn secondary';pdfButton.textContent='Stáhnout PDF pro tisk';pdfButton.onclick=downloadConstellationPDF;$('print-stars').after(pdfButton);
