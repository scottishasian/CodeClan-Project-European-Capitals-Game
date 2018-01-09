const Modal = function(options) {
  this.options = options;
  this.visible = false;
};
Modal.prototype.build = function(data) {
  const modalWrapper = document.createElement('div');
  // let html = '';
  // html += `
  //   <div class="overlay"></div>
  //   <div class="modal">
  //     <div class="modal-close">x</div>
  //     <div class="modal-header">
  //       <h1>${data.title}</h1>
  //     </div>
  //     <hr/>
  //     <div class="modal-body">
  //       ${data.body}
  //     </div>
  // `;

  const overlay =  document.createElement('div');
  overlay.classList.add('overlay');
  modalWrapper.appendChild(overlay);

  const modal = document.createElement('div');
  modal.classList.add('modal');

  const modalClose = document.createElement('div');
  modalClose.classList.add('modal-close');
  modal.appendChild(modalClose);

  const modalHeader = document.createElement('div');
  modalHeader.classList.add('modal-header');
  modal.appendChild(modalHeader);

  const title = document.createElement('h1');
  title.innerText = data.title;
  modalHeader.appendChild(title);

  const line = document.createElement('hr');
  modal.appendChild(line);

  const modalBody = document.createElement('div');
  modalBody.classList.add('modal-body');
  modalBody.innerHTML = data.body;
  modal.appendChild(modalBody);

  modalWrapper.appendChild(modal);



//   if (this.options.buttons) {
//     html += `<div class="modal-buttons">`;
//     if (this.options.buttons.close) {
//       html += `
//         <button class="modal-button btn-close">
//           ${this.options.buttons.close.label}
//         </button>`;
//     }
//     if (this.options.buttons.action) {
//       html += `
//         <button class="modal-button btn-action">
//           ${this.options.buttons.action.label}
//         </button>`;
//     }
//     html += `</div>`;
//   }
//   html += `</div>`;
//   modal.classList.add('modal-wrapper');
//   modal.innerHTML = html;
//   return modal;
return modalWrapper
};

Modal.prototype.show = function() {
  if (!this.visible) {
    document.querySelector('body').appendChild(this.build(this.options));
    document.querySelector('.modal-close').addEventListener('click', () => {
      if (this.options.onClose) {
        this.options.onClose();
      } else {
        this.hide();
      }
    });

    if (this.options.buttons) {
      if (this.options.buttons.close) {
        document
          .querySelector('.btn-close')
          .addEventListener('click', this.options.buttons.close.fn);
      }
      if (this.options.buttons.action) {
        document
          .querySelector('.btn-action')
          .addEventListener('click', this.options.buttons.action.fn);
      }
    }
    this.visible = true;
  }
};
Modal.prototype.hide = function() {
  if (this.visible) {
    const modal = document.querySelector('.modal');
    modal.parentNode.removeChild(modal);
    const overlay = document.querySelector('.overlay');
    overlay.parentNode.removeChild(overlay);
    this.visible = false;
  }
};
Modal.prototype.toggle = function() {
  this.visible ? this.hide() : this.show();
};
Modal.prototype.set = function(options) {
  this.options = Object.assign({}, this.options, options);
};


module.exports = Modal;
