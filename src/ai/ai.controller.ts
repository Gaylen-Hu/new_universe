import { Controller, Post, Body, Param, Res, HttpStatus, Sse } from '@nestjs/common';
import { AiService } from './ai.service';
import { HttpService } from '@nestjs/axios';
import { ApiOperation, ApiTags, ApiResponse, ApiBody, ApiQuery, ApiParam } from '@nestjs/swagger';

/**
 * AiController 是一个负责处理与 SEO 相关请求的控制器。
 * 它依赖于 AiService 和 HttpService 来实现具体功能。
 */
@ApiTags('AI服务')
@Controller('seo')
export class AiController {
    constructor(
        private readonly aiService: AiService,
        private readonly httpService: HttpService
    ) {}

    /**
     * 处理 POST 请求，用于生成 SEO 信息。
     * @param content 包含需要生成 SEO 信息的内容（content）。
     * @returns 返回生成的 SEO 信息。
     */
    @Post('generate')
    @ApiOperation({ summary: '生成SEO信息', description: '根据输入内容生成SEO优化信息' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                content: { type: 'string', description: '需要生成SEO信息的内容' }
            },
            required: ['content']
        }
    })
    @ApiResponse({ status: 200, description: '成功生成SEO信息', schema: {
        type: 'object',
        properties: {
            seoInfo: { type: 'string', description: '生成的SEO信息' }
        }
    }})
    @ApiResponse({ status: 500, description: '服务器内部错误' })
    async generateSeoInfo(@Body() content: { content: string }) {
        const seoInfo = await this.aiService.generateSeoInfo(content.content);
        return { seoInfo };
    }

    @Post('image')
    @ApiOperation({ summary: '生成图片SEO信息', description: '根据图片URL生成图片的SEO信息' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                url: { type: 'string', description: '图片URL地址', format: 'uri' }
            },
            required: ['url']
        }
    })
    @ApiResponse({ status: 200, description: '成功生成图片SEO信息', schema: {
        type: 'object',
        properties: {
            seoInfo: { type: 'string', description: '生成的图片SEO信息' }
        }
    }})
    @ApiResponse({ status: 400, description: '无效的URL格式' })
    @ApiResponse({ status: 500, description: '服务器内部错误' })
    async generateImageSeoInfo(@Body() content: { url: string }) {
        console.log('content.info', content);
        console.log('content.url', content.url);
        const seoInfo = await this.aiService.generateImageSeoInfo(content.url);
        return { seoInfo };
    }

    @Sse('stream/:id')
    @ApiOperation({ summary: '流式翻译', description: '通过SSE实现流式翻译功能' })
    @ApiParam({ name: 'id', description: '翻译任务ID', type: Number })
    @ApiResponse({ status: 200, description: 'SSE流式响应', content: {
        'text/event-stream': {
            schema: {
                type: 'object',
                properties: {
                    data: { type: 'string', description: '翻译结果片段' },
                    id: { type: 'number', description: '消息ID' },
                    event: { type: 'string', description: '事件类型' }
                }
            }
        }
    }})
    translateStream(@Param('id') id: number) {
        return this.aiService.streamTranslate(id);
    }
}