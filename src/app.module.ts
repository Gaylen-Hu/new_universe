// src\app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DeptModule } from './dept/dept.module';
import { PostModule } from './post/post.module';
import { RoleModule } from './role/role.module';
import { MenuModule } from './menu/menu.module';
import { RoleMenuModule } from './role_menu/role_menu.module';
import { RoleDeptModule } from './role_dept/role_dept.module';
import { UserPostModule } from './user_post/user_post.module';
import { DictTypeModule } from './dict_type/dict_type.module';
import { DictDataModule } from './dict_data/dict_data.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigsModule } from './configs/configs.module';

import { SysUser } from './user/entities/user.entity'; 
import { Post } from './post/entities/post.entity'; 
import { Dept } from './dept/entities/dept.entity'; 
import { Role } from './role/entities/role.entity'; 
import { Menu } from './menu/entities/menu.entity'; 
import { RoleMenu } from './role_menu/entities/role_menu.entity'; 
import { Note } from './notes/entities/note.entity';
import { RoleDept } from './role_dept/entities/role_dept.entity'; 
import { UserPost } from './user_post/entities/user_post.entity'; 
import { DictType } from './dict_type/entities/dict_type.entity'; 
import { DictDatum } from './dict_data/entities/dict_datum.entity';
import { Contact } from './contact/entities/contact.entity';
import { Config } from './configs//entities/configs.entity'; // 使用正确的实体名
import { Tag }    from './tag/entities/tag.entity';
import { Blog }   from './blogs/entities/blog.entity';
import { BlogStats }   from './blogs/entities/blog-stats.entity';
import { UserRoleModule } from './user_role/user_role.module';
import {UserRole } from './user_role/entities/user_role.entity';
import { ContactModule } from './contact/contact.module';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { MonitorModule } from './monitor/monitor.module';
import { BlogsModule } from './blogs/blogs.module';
import { TagModule } from './tag/tag.module';

import { AiModule } from './ai/ai.module';
import { NotesModule } from './notes/notes.module';


@Module({
  controllers: [AppController ],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [SysUser,RoleMenu,RoleDept,UserPost,Menu,Post,Role,DictType,DictDatum,Dept,Contact,UserRole,Config,Tag,Blog,BlogStats,Note],
        synchronize: true,
      }),
    }),
    DeptModule,
    PostModule,
    RoleModule,
    MenuModule,
    RoleMenuModule,
    RoleDeptModule,
    UserPostModule,
    DictTypeModule,
    DictDataModule,
    UserModule,
    AuthModule,
    UserRoleModule,
    ContactModule,
    ConfigsModule,
    MonitorModule,
    BlogsModule,
    TagModule,
    AiModule,
    NotesModule,
  ],
})
export class AppModule {}


