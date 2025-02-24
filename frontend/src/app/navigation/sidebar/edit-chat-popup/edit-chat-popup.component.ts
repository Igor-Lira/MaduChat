import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Chat } from 'src/app/classes/Chat';
import { ChatService } from 'src/app/services/chat.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-edit-chat-popup',
  templateUrl: './edit-chat-popup.component.html',
  styleUrls: ['./edit-chat-popup.component.scss']
})
export class EditChatPopupComponent {
  chat: FormGroup = new FormGroup({
    name: new FormControl(this.data.chat.name, [
      Validators.minLength(1), 
      Validators.maxLength(20),
      Validators.required
    ])
  });

  constructor(
    public dialogRef: MatDialogRef<EditChatPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { chat: Chat },
    private chatService: ChatService,
    public languageService: LanguageService
  ) {}

  saveChat() {
    this.chatService.editChat(this.data.chat.id, this.chat.value.name).subscribe((chat: Chat) => {
      this.dialogRef.close(chat);
    });
  }
}
