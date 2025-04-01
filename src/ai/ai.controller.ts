import { Controller, Post, Body, Param, Res, HttpStatus, Sse } from '@nestjs/common';
import { AiService } from './ai.service';
import { Response } from 'express';
import { lastValueFrom, Observable, fromEvent, interval, firstValueFrom } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import OpenAI from "openai";
/**
 * AiController 是一个负责处理与 SEO 相关请求的控制器。
 * 它依赖于 AiService 和 HttpService 来实现具体功能。
 */
@Controller('seo')
export class AiController {
    // 构造函数，注入依赖服务
    constructor(
        private readonly aiService: AiService, // AI 服务，用于生成 SEO 信息
        private readonly httpService: HttpService // HTTP 服务，用于发送外部 HTTP 请求
    ) {}

    /**
     * 处理 POST 请求，用于生成 SEO 信息。
     * @param content 包含需要生成 SEO 信息的内容（content）。
     * @returns 返回生成的 SEO 信息。
     */
    @Post('generate')
    async generateSeoInfo(@Body() content: { content: string }) {
        // 调用 AiService 的方法生成 SEO 信息
        const seoInfo = await this.aiService.generateSeoInfo(content.content);
        // 返回生成的 SEO 信息
        return { seoInfo };
    }



    @Sse('stream/:id')
    translateStream(@Param('id') id: number) {
      return this.aiService.streamTranslate(id);
    }
}