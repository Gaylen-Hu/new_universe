import { Controller, Post, Body, Param, Res, HttpStatus, Sse } from '@nestjs/common';
import { AiService } from './ai.service';
import { Response } from 'express';
import { lastValueFrom, Observable, fromEvent, interval, firstValueFrom } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

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
    sendServerMessage(@Param('id') id: number): Observable<string> {
        return new Observable<string>((observer) => {
            const processStream = async () => {
                const blogContent = await this.aiService.getBlogContentById(id);
                const apiKey = process.env.doubao_API_key;
                if (!apiKey) {
                    observer.error('API key is missing');
                    return;
                }
                const model = process.env.doubao_model;
                if (!model) {
                    observer.error('Model is missing');
                    return;
                }

                const response: AxiosResponse = await firstValueFrom(
                    this.httpService.post(
                        'https://ark.cn-beijing.volces.com/api/v3/chat/completions',
                        {
                            model: model,
                            stream: true,
                            messages: [
                                {
                                    role: 'system',
                                    "content": "你是一个专业的翻译助手，擅长将中文文章翻译成英文。你将帮助用户将提供的中文文章翻译成符合日常英文语境的自然流畅的内容。用户将提供一篇文章，文章内容可能是以Markdown或HTML格式表示，长度大约在500-1500字之间。文章可以包含多个标题、段落、图片等内容。请根据提供的文章内容，\n请注意：根据输入的文章格式（Markdown或HTML），返回的内容应尽量保持相同的格式。Markdown内容应返回为Markdown格式，HTML内容应返回为HTML格式。尽量保留原有格式和结构。\n"
                                },
                                {
                                    role: 'user',
                                    content: blogContent,
                                },
                            ],
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${apiKey}`,
                                'Content-Type': 'application/json',
                            },
                            responseType: 'stream', // Ensure using stream response
                        }
                    )
                );

                // Observing the response stream and pushing it to the client
                response.data.on('data', (chunk) => {
                    // Convert buffer to string and send to the client
                    let data =  chunk.toString('utf-8');
                    data = data.replace(/data: /g, ''); // Remove new lines
                    observer.next(data);
                });
                response.data.on('end', () => {
                    console.log('end');
                    observer.complete(); // Complete the stream once the API response ends
                });

                response.data.on('error', (err) => {
                    observer.error(err); // Handle errors
                });
            }
            processStream();
        });
    }
}