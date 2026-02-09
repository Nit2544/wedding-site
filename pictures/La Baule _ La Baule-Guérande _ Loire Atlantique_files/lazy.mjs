let mod=null;
class LazyTouristicMap extends HTMLElement{
  /** @type {?TouristicMap} */
  #map = null;
  #loadParams=null;
  #loadMapWithParams=null;

  /** @type {IntersectionObserver} */ #intersectionObserver;
  constructor() {
    super();
    this.#intersectionObserver=new IntersectionObserver(entries=>{
      const entry=entries.find(it=>it.target===this);
      if(entry.isIntersecting){
        this.load();
        this.#intersectionObserver=null;
      }
    });
  }
  connectedCallback(){
    if(this.#intersectionObserver) this.#intersectionObserver.observe(this);
    else this.#attach();
  }
  get map() {
    return this.#map;
  }
  disconnectedCallback(){
    this.#intersectionObserver?.disconnect();
  }

  connectAfter(params,applyParams){
    this.#loadParams=params;
    this.#loadMapWithParams=applyParams;
    const map=this.#map;
    if(!map) return;
    (async()=>{
      await this.#params();
      await this.#applyParams();
    })();
  }

  async #params(){
    const loadParams=this.#loadParams;
    this.#loadParams=(typeof loadParams==='function'?await loadParams():await loadParams);
  }

  async #applyParams(){
    const map=this.#map;
    if(!map) return;
    const loadMapWithParams=this.#loadMapWithParams;
    const params=this.#loadParams;
    this.#loadMapWithParams=null;
    this.#loadParams=null;
    if(loadMapWithParams){
      await loadMapWithParams(map,await mod,params);
    }
  }

  async load(){
    if(!mod) mod=import('./mod.mjs');
    if(!this.#intersectionObserver) return;
    this.#intersectionObserver?.disconnect();
    this.#intersectionObserver=null;
    const [{TouristicMap},]=await Promise.all([
      mod,
      this.#params()
    ]);
    let conf={};
    try{
      const Null=Symbol();
      const script=this.querySelector('script[type="application/json"]');
      if(script&&script.textContent){
        const json=JSON.parse(this.querySelector('script[type="application/json"]')?.textContent)||{};
        Object.entries(json).forEach(([k,v])=>{
          if(conf[k]??Null===Null) conf[k]=v;
        });
      }
    }catch(e){
      console.error('Failed to parse inline map configuration.', e);
    }
    const map=new TouristicMap(conf);
    this.#map=map;
    await this.#applyParams();
    this.dispatchEvent(new CustomEvent('load',{detail:map}));
    if(this.isConnected){
      setTimeout(this.#attach.bind(this),0);
    }
  }

  #attach(){
    const map=this.#map;
    if(map&&this.isConnected){
      let child=this.firstElementChild;
      while(child){
        let next=child.nextElementSibling;
        map.appendChild(this.removeChild(child));
        child=next;
      }
      this.parentNode.replaceChild(map,this);
      this.dispatchEvent(new CustomEvent('connected',{detail:map}));
    }
  }
}
customElements.define('lazy-touristic-map',LazyTouristicMap);
export default LazyTouristicMap;
export {LazyTouristicMap};