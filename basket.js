//Create a new component for product-details with a prop of details. 
     
Vue.component('product', {
  props: {
    premium: { 
      type: Boolean,
      required: true
    },
    offer: {
      type: Array,
      required: false
    },
  },
  template: `
   <div class="product">  
      <div class="product-image">  
        <transition name="fade">
        <img v-if="inStock" :src="image" />
          </transition>
      </div>
      <div class="product-info">
          <h1>{{ product }}</h1>
          <p v-if="inStock">Имеется в наличии</p>
          <p v-else>Не имеется в наличии</p>
          <p> Доставка: {{ shipping }}</p>
          <p> Остаток в магазине: {{ variantQuanaity }}</p>
          <p> Цена: {{price}} </p>

          <product-details :details="details"></product-details>

          <div class="color-box"
               v-for="(variant, index) in variants" 
               :key="variant.variantId"
               :style="{ backgroundColor: variant.variantColor }"
               @mouseover="updateProduct(index)"
               >
          </div> 

          <button v-on:click="addToCart" 
            :disabled="!inStock"
            :class="{ disabledButton: !inStock }"
            >
         Добавить в корзину
          </button>
  
   <button v-on:click="removeFromCart" 
            :class="{ disabledButton: !removingOportunity}"
            > Удалить из корзины
            </button>
        

       </div>  
    
    </div>
   `,
  data: function () {
    return {
        product: JSON.parse(JSON.stringify(this.offer))[0]['product'],
        brand: 'Vue Mastery',
        selectedVariant: 0,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: this.offer,
        
    }
  },
    methods: {
      addToCart: function() {  
         if(this.variants[this.selectedVariant].variantQuantity>0){
            this.variants[this.selectedVariant].variantQuantity-=1;
            this.$root.cart.push(this.variants[this.selectedVariant]);
          this.$root.cartQuantity +=1;
        }
      },
      
      removeFromCart: function() {
        for (index = 0; index < this.$root.cart.length; ++index) {
            if(this.$root.cart[index] == this.variants[this.selectedVariant])
              {
                this.$root.cart.splice(index, 1);
                this.$root.cartQuantity -=1;
                this.variants[this.selectedVariant].variantQuantity+=1;
              }
          };
      }, 
      
        updateProduct: function(index){
          this.selectedVariant = index
        },
      },

computed: {
          title() {
              return this.brand + ' ' + this.product  
          },
          removingOportunity() {
            removingOportunity = false;
            for (index = 0; index < this.$root.cart.length; ++index) {
              if(this.$root.cart[index] == this.variants[this.selectedVariant])
                {
                  removingOportunity = true;
                }
              };
            if(removingOportunity && this.$root.cart.length != 0){
              console.log(this.$root.cart.length);
              removingOportunity = false;
              return true;
            }
              return false;
          },
   
          image(){
              return this.variants[this.selectedVariant].variantImage
          },
          variantQuanaity() {
            return this.variants[this.selectedVariant].variantQuantity
          },
          inStock(){
              return this.variants[this.selectedVariant].variantQuantity
          },
          cartQuantity(){
            return this.$root.cartQuantity
          },
          shipping() {
            if (this.premium) {
              return "Free"
            }
            return 2.99
        },
          price() {
            return this.variants[this.selectedVariant].price
          },
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: [],
        cartQuantity: 0,
        tags: 'dsad',
    },
})
