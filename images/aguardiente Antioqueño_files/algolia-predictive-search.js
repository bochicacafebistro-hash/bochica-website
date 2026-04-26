class AlgoliaSearchDrawer extends DrawerElement{constructor(){super()}get shouldAppendToBody(){return!1}get input(){return this.querySelector('input[type="search"]')}get focusElement(){return this.querySelector('input[type="search"]')}}if(customElements.define("algolia-search-drawer",AlgoliaSearchDrawer),!customElements.get("algolia-predictive-search")){class AlgoliaPredictiveSearch extends HTMLElement{constructor(){super(),this.isInit=!1,this.searchInput=this.querySelector('input[type="search"]'),this.lastQueryID=""}connectedCallback(){if(!this.isInit){if(window.algoliaIsLoaded){if(this.hasAttribute("data-disable-predictive"))return;this.init();return}window.addEventListener("algolia:script-loaded",()=>{this.hasAttribute("data-disable-predictive")||this.init()})}}init(){if(this.isInit)return;this.isInit=!0,this.algoliaClient=window.algoliasearch("25TO6MPUL0","1aa0c19fe6a0931340570bd358c2c9d2"),this.algoliaClient.initIndex("shopify_products"),this.customer=this.dataset.customerId||null;const skipInitialQuery=this.hasAttribute("data-skip-initial-query"),searchTerm=this.getSearchTermFromURL();searchTerm&&this.searchInput?(this.searchInput.value=searchTerm,skipInitialQuery||this.fetchSearchResults(searchTerm,!0)):this.handleReset(),this.addDelegatedClickListeners()}addDelegatedClickListeners(){const debouncedFetch=theme?.utils?.debounce(q=>this.fetchSearchResults(q),200);this.searchInput.addEventListener("input",()=>{const q=(this.searchInput.value||"").trim();if(q===""){this.handleReset();return}debouncedFetch(q)});const form=this.querySelector("form");form&&form.addEventListener("submit",e=>{e.preventDefault(),this.handleFormSubmit()});const resetButton=this.querySelector('button[type="reset"]');resetButton&&resetButton.addEventListener("click",e=>{this.handleReset()}),this.addEventListener("click",e=>{this.handleSearchResultClick(e)})}escapeHtml(text){const div=document.createElement("div");return div.textContent=text,div.innerHTML}buildSuggestions(suggestions){return`
        <li class="grid gap-3 md:gap-4">
          <p class="search__heading block text-xs leading-tight font-bold">Suggestions<p>
          <ul class="grid gap-2">
            ${suggestions.map(suggestion=>`
              <li>
                <a class="reversed-link text-base md:text-lg leading-tight font-bold" href="https://www.bswliquor.com/search?q=${encodeURI(suggestion.query)}">
                  ${this.escapeHtml(suggestion.query)}
                </a>
              </li>
            `).join("")}
          </ul>
        </li>
      `}buildProducts(products){return`
        <li class="grid gap-3 md:gap-4">
          <p class="search__heading block text-xs leading-tight font-bold">Products</p>
          <div class="grid gap-2">
            ${products.map(product=>`
              <intersection-loader 
                data-url="/products/${product.handle}" 
                data-section-id="product-card-horizontal"
                data-object-id="${product.objectID}"
                data-position="${product.position}"
              >
              </intersection-loader>
            `).join("")}
          </div>
        </li>
      `}buildCollections(collections){return`
        <li class="grid gap-3 md:gap-4">
          <p class="search__heading block text-xs leading-tight font-bold">Collections</p>
          <ul class="grid gap-2">
            ${collections.map(collection=>`
              <li>
                <a 
                  class="reversed-link text-base md:text-lg leading-tight font-bold"
                  href="/collections/${collection.handle}"
                  data-collection-object-id="${collection.objectID}"
                  data-collection-position="${collection.__position||""}"
                >
                  ${this.escapeHtml(collection.title)}
                </a>
              </li>
            `).join("")}
          </ul>
        </li>
      `}buildSeeAllButton(){return`
        <div class="search__form__submit-wrapper">
          <button class="button button--primary" type="submit" is="hover-button">
            <span class="btn-fill" data-fill></span>
            <span class="btn-text">See All Results</span>
          </button>
        </div>
      `}buildResults(products,suggestions,collections,query,productCount){const searchWrapper=this.querySelector("[data-search-wrapper]"),defaultSuggestionsWrapper=this.querySelector("[data-default-suggestions]"),productCountElement=document.querySelector("[data-search-product-count]");if(!query){searchWrapper.innerHTML="",defaultSuggestionsWrapper.classList.remove("hidden"),productCountElement&&(productCountElement.textContent="");return}productCountElement&&productCount>0&&(productCountElement.textContent=`${productCount} results`),defaultSuggestionsWrapper.classList.add("hidden"),searchWrapper.innerHTML=`
        ${suggestions.length>0?this.buildSuggestions(suggestions):""}
        ${collections.length>0?this.buildCollections(collections):""}
        ${products.length>0?this.buildProducts(products):""}
        ${products.length>0?this.buildSeeAllButton():""}
      `}async fetchSearchResults(query,showCount=!1){await this.algoliaClient.multipleQueries([{indexName:"shopify_products",params:{hitsPerPage:10,page:0,query,filters:'NOT tags:"Bottle Deposit" AND inventory_available:true',clickAnalytics:!0,optionalFilters:["inventory_available:true"]}},{indexName:"shopify_products_query_suggestions",params:{hitsPerPage:5,page:0,query}},{indexName:"shopify_collections",params:{hitsPerPage:5,page:0,query,attributesToRetrieve:["title","handle","objectID","products_count"],numericFilters:["products_count>0"]}}]).then(res=>{const productResults=res?.results[0],suggestionResults=res?.results[1],collectionResults=res?.results[2];this.lastQueryID=productResults?.queryID,this.buildResults(productResults?.hits,suggestionResults?.hits,collectionResults?.hits,suggestionResults?.query,showCount?productResults?.nbHits:null)})}handleSearchResultClick(event){if(typeof aa!="function"){console.warn("Algolia analytics not loaded");return}const productCard=event.target.closest("[data-object-id]");if(productCard){const objectId=productCard.getAttribute("data-object-id"),position=productCard.getAttribute("data-position");if(!objectId)return;aa("clickedObjectIDsAfterSearch",{userToken:this.customer||"guest",eventName:"Product Clicked",index:"shopify_products",queryID:this.lastQueryID,objectIDs:[objectId],positions:[position?parseInt(position):1]})}const collectionLink=event.target.closest("[data-collection-object-id]");if(collectionLink){const objectId=collectionLink.getAttribute("data-collection-object-id"),position=collectionLink.getAttribute("data-collection-position")||1;aa("clickedObjectIDsAfterSearch",{userToken:this.customer||"guest",eventName:"Collection Clicked",index:"shopify_collections",objectIDs:[objectId],positions:[parseInt(position)]})}}handleFormSubmit(){const query=this.searchInput?this.searchInput.value.trim():"";if(query){const searchUrl=`${window.location.origin}/search?q=${encodeURIComponent(query)}`;window.location.href=searchUrl}}getSearchTermFromURL(){return new URLSearchParams(window.location.search).get("q")||""}handleReset(){const searchWrapper=this.querySelector("[data-search-wrapper]"),defaultSuggestionsWrapper=this.querySelector("[data-default-suggestions]"),productCountElement=document.querySelector("[data-search-product-count]");searchWrapper&&(searchWrapper.innerHTML=""),defaultSuggestionsWrapper&&defaultSuggestionsWrapper.classList.remove("hidden"),productCountElement&&(productCountElement.textContent=""),this.searchInput&&this.searchInput.focus()}}customElements.define("algolia-predictive-search",AlgoliaPredictiveSearch)}
//# sourceMappingURL=/cdn/shop/t/117/assets/algolia-predictive-search.js.map?v=26658441286395388611773345295
