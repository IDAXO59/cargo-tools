/* Map state glow animation */
(function(){
    function run(){
        var svg=document.querySelector('.map-bg svg');
        if(!svg)return;
        var all=Array.from(svg.querySelectorAll('path[id]'))
            .filter(function(p){return p.id&&p.id.length<=2;});
        if(all.length<3)return;
        var busy=new Set();
        var MAX=3;

        function activate(){
            if(busy.size>=MAX)return;
            var pool=all.filter(function(p){return!busy.has(p.id);});
            if(!pool.length)return;
            var p=pool[Math.floor(Math.random()*pool.length)];
            busy.add(p.id);
            p.classList.add('state-lit');
            var hold=2200+Math.random()*2600;
            setTimeout(function(){
                p.classList.remove('state-lit');
                setTimeout(function(){busy.delete(p.id);},2100);
            },hold);
        }

        function loop(){
            activate();
            setTimeout(loop,800+Math.random()*1100);
        }
        // stagger startup
        setTimeout(activate,400);
        setTimeout(activate,1300);
        setTimeout(activate,2400);
        setTimeout(loop,900);
    }

    function init(){
        var containers=document.querySelectorAll('.map-bg');
        if(!containers.length){run();return;}
        var base=document.currentScript
            ? document.currentScript.src.replace(/\/js\/[^/]+$/,'')
            : (document.querySelector('script[src*="map.js"]')||{src:''}).src.replace(/\/js\/[^/]+$/,'');
        fetch(base+'/map.svg')
            .then(function(r){return r.text();})
            .then(function(html){
                containers.forEach(function(c){c.innerHTML=html;});
                run();
            })
            .catch(function(){run();}); // fallback if SVG already inline
    }

    if(document.readyState==='loading'){
        document.addEventListener('DOMContentLoaded',init);
    }else{init();}
})();
