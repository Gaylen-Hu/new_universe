import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { AxiosResponse } from 'axios';
import { lastValueFrom, Observable, fromEvent ,firstValueFrom } from 'rxjs';
import { map, mergeMap, takeUntil } from 'rxjs/operators';
import { stream } from 'xlsx';
import { Blog } from '../blogs/entities/blog.entity';


// 定义接口类型，响应结构
interface ChatResponse {
  choices: {
    message: {
      content: string;
      
    };
  }[];
}

@Injectable()
export class AiService {
constructor(
    private readonly httpService: HttpService,  // HttpService 需要注入

    @InjectRepository(Blog) private readonly blogRepository: Repository<Blog>,  // 注入 Blog 仓库

  ) {}




  async generateSeoInfo(content: string): Promise<string> {
    const apiKey = process.env.doubao_API_key; // 从环境变量获取API密钥
    if (!apiKey) {
      throw new Error('API key is missing');
    }
    const model = process.env.doubao_model; // 从环境变量获取API密钥
    if (!model) {
      throw new Error('model is missing');
    }
    const response = await lastValueFrom<AxiosResponse<ChatResponse>>(
      this.httpService.post(
        'https://ark.cn-beijing.volces.com/api/v3/chat/completions', // 修改为你使用的接口地址
        {
          model: model,
            "messages": [
            {
                "role": "system",
                "content": "你是一个专业的SEO助手，擅长从文章内容中提取关键SEO信息，并生成优化的SEO元素。\n            SEO（搜索引擎优化）是一种提高网站在搜索引擎中排名的技术。你将帮助用户分析并优化文章的SEO元素，包括生成合适的文章标题、关键词、摘要等SEO相关信息。用户将提供一篇文章，文章内容可能是以Markdown或HTML格式表示。文章的长度大约在500-1500字之间。文章可以包含多个标题、段落、图片等内容。请根据提供的文章内容，生成以下SEO信息：\n            1. **标题**：简洁且具有吸引力的文章标题，符合SEO优化的要求，包含主要关键词。\n            2. **关键词**：从文章内容中提取至少5个相关且高搜索量的关键词，按重要性排序，最多不超过10个。\n            3. **摘要**：为文章生成一段简短的描述，清晰地概括文章的核心内容，长度约150-200字。\n            返回的结果应该是一个 **标准的 JSON 格式**，包含以下字段，包含以下字段：\n```json\n{\n  \"title\": \"文章标题\",\n  \"keywords\": [\"关键词1\", \"关键词2\", \"关键词3\", ...],\n  \"description\": \"文章摘要\"\n}\n返回的数据应该直接是一个可以被程序解析的 JSON 字符串```"
                
            },
            {
                "role": "user",
                "content": content
            }
        ],
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      ),
    );
    // 返回生成的 SEO 信息
    return response.data.choices[0].message.content.trim();
  }
//   通过ID获取博客内容
async getBlogContentById(id: number): Promise<string> {
    const blog = await this.blogRepository.findOne({ where: { blog_id: id },});  // 通过ID查找博客
    if (!blog) {
      throw new Error('Blog not found');
    }
    return blog.content;  // 返回博客的内容
  }




}
