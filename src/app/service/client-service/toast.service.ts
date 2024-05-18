// toast.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor() {}

  showSuccess(message: string) {
    console.log('Success Toast:', message);
  }

  showError(message: string) {
    console.error('Error Toast:', message);
  }
}
