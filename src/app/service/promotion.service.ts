// promotion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
    private apiUrl = `http://localhost:3002/api/codes`;
  constructor(private http: HttpClient) {}
  

  getAllCodes() {
    return this.http.get<any[]>('http://localhost:3002/api/codes');
  }
  deleteCode(codeId: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:3002/api/codes/${codeId}`);
  }
  updateCode(code: any): Observable<any> {
    const url = `http://localhost:3002/api/codes/${code._id}`;
    return this.http.put<any>(url, code);
  }
applyDiscountCode(code: string, orderTotal: number): Observable<any> {
  console.log('Mã giảm giá nhận được:', code); // Thêm dòng này để kiểm tra giá trị của code
  const url = `${this.apiUrl}/apply`; 
  return this.http.post<any>(url, { code, orderTotal }); 
}
getAllCampaignsForProduct(): Observable<any> {
  return this.http.get<any[]>(`http://localhost:3002/api/campaigns/applied/`);
}

applyCampaignToProducts(campaignId: string, productIds: string[]): Observable<any> {
  // Truyền thông tin productIds vào body của request
  return this.http.put<any>(`http://localhost:3002/api/campaigns/apply/${campaignId}`, { productIds });
}
getAllCampaigns(): Observable<any[]> {
  return this.http.get<any[]>(`http://localhost:3002/api/campaigns/`);
}

getCampaignById(campaignId: string): Observable<any> {
  return this.http.get<any>(`http://localhost:3002/api/campaigns/${campaignId}`);
}
updateCampaign(campaign: any): Observable<any> {
  return this.http.put<any>(`http://localhost:3002/api/campaigns/${campaign._id}`, campaign);
}

deleteCampaign(campaignId: string): Observable<any> {
  return this.http.delete<any>(`http://localhost:3002/api/campaigns/${campaignId}`);
}
}
