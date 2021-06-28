app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: 
  /*html*/
  `<div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img :src="image">
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>

        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>

        <p>Price: {{ price }}</p>

        <p>Shipping: {{ shipping }}</p>
        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>

        <div 
          v-for="(variant, index) in variants" 
          :key="variant.id" 
          @mouseover="updateVariant(index)" 
          class="color-circle" 
          :style="{ backgroundColor: variant.color }">
        </div>
        
        <button 
          class="button" 
          :class="{ disabledButton: !inStock }" 
          :disabled="!inStock" 
          @click="addToCart">
          Add to Cart
        </button>

      </div>
    </div>
    <review-list v-if="reviews.length" :reviews="reviews"></review-list>
    <review-form @review-submitted="addReview"></review-form>
  </div>`,
  data() {
    return {
        selectedVariant: 0,
        details: ['A graphics processing unit (GPU) is a specialized electronic circuit designed to rapidly manipulate and alter memory to accelerate the creation of images in a frame buffer intended for output to a display device.', 'GPUs are used in embedded systems, mobile phones, personal computers, workstations, and game consoles.'],
        variants: [
          { id: 2234, color: '#ED1C24', image: './assets/images/ATI HD 5450.jpg', quantity: 50, brand: 'AMD', product: 'ATI HD 5450', price: "$299"},
          { id: 2235, color: '#76b900', image: './assets/images/RTX3080.jpg', quantity: 0, brand: 'Nvidia', product: 'RTX 3080', price: "$3599"},
        ],
        reviews: []
    }
  },
  methods: {
      addToCart() {
          this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
      },
      updateVariant(index) {
          this.selectedVariant = index
      },
      addReview(review) {
        this.reviews.push(review)
      }
  },
  computed: {
      title() {
          return this.variants[this.selectedVariant].brand + ' ' + this.variants[this.selectedVariant].product
      },
      image() {
          return this.variants[this.selectedVariant].image
      },
      price() {
        return this.variants[this.selectedVariant].price
      },
      inStock() {
          return this.variants[this.selectedVariant].quantity
      },
      shipping() {
        if (this.premium) {
          return 'Free'
        }
        return 2.99
      }
  }
})