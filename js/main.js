class cardObject {
  constuctor() {
    this.index;
    this.initPosition;
    this.previousPosition;
    this.currentPosition;
    this.cardElement;
    this.cardElementHeight;
    this.cardElementWidth;
    this.endTouchTime;
    this.currentTouchTime;
    this.flickTween = null;
  }

  init(element, index) {
    this.index = index;
    this.cardElement = document.querySelector(`.${element}`);
    this.cardElement.addEventListener("touchstart", e => this.touchStart(e));
    this.cardElement.addEventListener("touchmove", e => this.touchMove(e));
    this.cardElement.addEventListener("touchend", e => this.touchEnd(e));

    this.cardElementHeight = this.cardElement.getBoundingClientRect().height;
    this.cardElementWidth = this.cardElement.getBoundingClientRect().width;

    this.initPosition = { x: 0, y: 0 };
    this.previousPosition = { x: 0, y: 0 };
    this.currentPosition = { x: 0, y: 0 };
  }

  setToTop() {
    cards.forEach(item => item.setToBottom());
    this.cardElement.style.zIndex = "999";
  }

  setToBottom() {
    this.cardElement.style.zIndex = "0";
  }

  touchStart(e) {
    this.setToTop();
    if (this.flickTween != null) {
      this.flickTween.kill();
    }
    this.initPosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };

    this.shiftRatios = {
      x: this.initPosition.x - this.cardElement.getBoundingClientRect().x,
      y: this.initPosition.y - this.cardElement.getBoundingClientRect().y
    };

    this.lastTouchPosition = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  }

  touchMove(e) {
    this.currentPosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };

    this.delta = {
      x: this.currentPosition.x - this.previousPosition.x,
      y: this.currentPosition.y - this.previousPosition.y
    };

    gsap.to(this.cardElement, {
      x: this.currentPosition.x - this.shiftRatios.x,
      y: this.currentPosition.y - this.shiftRatios.y,
      duration: 0.1
    });

    this.previousPosition = {
      x: this.currentPosition.x,
      y: this.currentPosition.y
    };

    // this.currentTouchTime = new Date().getTime();
  }

  touchEnd(e) {
    // this.endTouchTime = new Date().getTime();

    if (Math.abs(this.delta.y) > 1 || Math.abs(this.delta.x) > 1) {
      this.flickTween = gsap.to(this.cardElement, {
        x: this.previousPosition.x - this.shiftRatios.x + this.delta.x * 8,
        y: this.previousPosition.y - this.shiftRatios.y + this.delta.y * 8,
        ease: Expo.easeOut,
        duration: 1
      });
    }
  }
}

let cardOne = new cardObject();
let cardTwo = new cardObject();
let cardThree = new cardObject();

cardOne.init("card-1", 0);
cardTwo.init("card-2", 1);
cardThree.init("card-3", 2);

let cards = [cardOne, cardTwo, cardThree];
