import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from '../blogs/entities/blog.entity';
import OpenAI from "openai";
import { Observable } from 'rxjs';
@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor(
    @InjectRepository(Blog) private readonly blogRepository: Repository<Blog>,
  ) {
    this.openai = new OpenAI({
      baseURL: 'https://api.deepseek.com',
      apiKey: process.env.OPENAI_API_KEY, // Get API key from environment variables
      // You can add other configuration options here if needed
    });
  }

  async generateSeoInfo(content: string): Promise<string> {
    try {
      const completion = await this.openai.chat.completions.create(
        {
        model: "deepseek-chat", // or "gpt-4" if you have access
        messages: [
          {
            "role": "system",
            "content": "You are a professional SEO assistant skilled at extracting key SEO information from article content and generating optimized SEO elements.\n\nSEO (Search Engine Optimization) is a technique to improve a website's ranking in search engines. You will help users analyze and optimize SEO elements for articles, including generating appropriate article titles, keywords, summaries, and other SEO-related information. Users will provide an article, which may be in Markdown or HTML format. The article length is typically between 500-1500 words. The article may contain multiple headings, paragraphs, images, etc.\n\nPlease generate the following SEO information based on the provided article content:\n1. **Title**: A concise and attractive article title that meets SEO optimization requirements and includes main keywords.\n2. **Keywords**: Extract at least 5 relevant, high-search-volume keywords from the article content, sorted by importance (maximum 10).\n3. **Description**: Generate a brief summary that clearly outlines the core content of the article (about 150-200 characters).\n\nThe response should be in **standard JSON format** with the following fields:\n```json\n{\n  \"title\": \"Article Title\",\n  \"keywords\": [\"Keyword1\", \"Keyword2\", \"Keyword3\", ...],\n  \"description\": \"Article description\"\n}\n```\nThe returned data should be a valid JSON string that can be directly parsed by a program."
          },
          {
            "role": "user",
            "content": content
          }
        ],
        response_format:{
          'type': 'json_object'
        }
      });

      // Extract the content from the response
      const responseContent = completion.choices[0]?.message?.content;
      if (!responseContent) {
        throw new Error('No content received from OpenAI');
      }
      const jsonContent = JSON.parse(responseContent);
      console.log('Generated SEO info:', jsonContent);
      return jsonContent
    } catch (error) {
      console.error('Error generating SEO info:', error);
      throw new Error('Failed to generate SEO information');
    }
  }

  streamTranslate(id: number): Observable<{ data: string }> {
    return new Observable<{ data: string }>((observer) => {
      (async () => {
        try {
          // 获取博客内容
          const blogContent = await this.getBlogContentById(id);
          
          // 创建OpenAI流式请求
          const stream = await this.openai.chat.completions.create({
            model: "deepseek-chat",
            stream: true,
            messages: [
              {
                role: 'system',
                content: "你是一个专业的翻译助手，擅长将中文文章翻译成英文。你将帮助用户将提供的中文文章翻译成符合日常英文语境的自然流畅的内容。用户将提供一篇文章，文章内容可能是以Markdown或HTML格式表示，长度大约在500-1500字之间。文章可以包含多个标题、段落、图片等内容。请根据提供的文章内容，\n请注意：根据输入的文章格式（Markdown或HTML），返回的内容应尽量保持相同的格式。Markdown内容应返回为Markdown格式，HTML内容应返回为HTML格式。尽量保留原有格式和结构。 其中代码片段不需要注明代码语言\n"
              },
              {
                role: 'user',
                content: blogContent,
              },
            ],
          });

          // 处理流式响应
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              console.log('Stream content:', content);  
              observer.next({ data: content });
            }
          }

          observer.complete();
        } catch (error) {
          console.error('流式翻译错误:', error);
          observer.error(error);
        }
      })();
    });
  }


  async getBlogContentById(id: number): Promise<string> {
    const blog = await this.blogRepository.findOne({ where: { blog_id: id } });
    if (!blog) {
      throw new Error('Blog not found');
    }
    return blog.content;
  }
}