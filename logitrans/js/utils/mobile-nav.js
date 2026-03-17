export function openMobMenu(){
    let overlay = document.querySelector('.overlay');
    let mobileMenu = document.querySelector('.nav-menu');
    mobileMenu.classList.add('open');
    overlay.classList.add('open');
    document.body.classList.add('menu-open');
}

export function closeMobMenu(event){
    let overlay = document.querySelector('.overlay');
    let mobileMenu = document.querySelector('.nav-menu');

    if (event.target.classList.contains('overlay')) {

      $('.nav-menu').removeClass('open');
      $('.overlay').removeClass('open');
      $('body').removeClass('menu-open');
  }

}

export function openMobSubMenu(){
    console.log('works')
      if(this.closest('.drop-down')){
        console.log(this.closest('.drop-down'));
        if(this.closest('.drop-down').querySelector('.drop-down-menu').classList.contains('open')){
          this.closest('.drop-down').classList.remove('open')
          this.closest('.drop-down').querySelector('.drop-down-menu').classList.remove('open');
          
        }
        else if(!this.closest('.drop-down').querySelector('.drop-down-menu').classList.contains('open')){
          this.closest('.drop-down').querySelector('.drop-down-menu').classList.add('open')
          this.closest('.drop-down').classList.add('open');
          
        }
      
    }
}