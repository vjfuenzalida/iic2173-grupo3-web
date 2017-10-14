import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ApiService } from './../api.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product_id = null;
  error_msg = null;
  product = {
    id: null,
    category: {
        id: null,
        context: null,
        area: null,
        group: null
    },
    name: null,
    success: false
  };

  constructor(private router: Router, private user: UserService, private api: ApiService) {
  }

  ngOnInit() {
  }

  searchProduct() {
    if (/^\d+$/.test(this.product_id) === false) {
      return;
    }
    const username = this.user.getUsername();
    console.log('Product Code:', this.product.id);
    this.api.getData(`/product/${this.product_id}`, true)
    .then(data => {
      if (data['success']) {
        this.product.id = data['id'];
        this.product.category = data['category'];
        this.product.name = data['name'];
        this.product.success = true;
        this.error_msg = false;
      } else {
        this.product.success = false;
        this.error_msg = true;
      }
    });

  }


}
