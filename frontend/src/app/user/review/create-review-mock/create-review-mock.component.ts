import { LanguageService } from './../../../services/language.service';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-review-mock',
  templateUrl: './create-review-mock.component.html',
  styleUrl: './create-review-mock.component.scss'
})
export class CreateReviewMockComponent {

  review: FormGroup = new FormGroup({
    text: new FormControl('', [
      Validators.minLength(1),
      Validators.maxLength(20),
      Validators.required
    ]),
  });

  stars: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { targetid: string },
    public languageService: LanguageService,
    public userService: UserService,
  ) {}

  send() {
    this.userService.createReview(this.data.targetid, this.review.controls['text'].value, this.stars).subscribe(data => {
      console.log(data);
    });
  }

  setCurrentStars(index: number) {
    this.stars = index;
    for (let i = 1; i <= 5; i++) {
      const el = <HTMLElement>document.getElementById('star-' + i);
      if (i <= this.stars) {
        el.innerHTML = 'star';
      } else {
        el.innerHTML = 'star_outline';
      }
    }
  }
}
