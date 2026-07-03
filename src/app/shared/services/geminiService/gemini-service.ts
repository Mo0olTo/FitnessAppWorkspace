import { Injectable } from '@angular/core';
import { GoogleGenAI } from '@google/genai';
import { environment_ai } from '../../../../environments/environment-ai';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private readonly ai = new GoogleGenAI({
    apiKey: environment_ai.geminiApiKey,
  });

  async chat(message: string): Promise<string | undefined> {
    try {
      const result = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: message,
      });
      return result.text;
    } catch (err) {
      console.error('GeminiService.chat failed', err);
      throw new Error('AI service unavailable');
    }
  }
}