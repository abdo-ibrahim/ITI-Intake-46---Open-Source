import { Module } from '@nestjs/common';
import { BookmarkController } from './controllers/bookmark.controller';
import { BookmarkService } from './services/bookmark.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Bookmark, BookmarkSchema } from './schemas/bookmark.schema';
import { BookmarkRepository } from './repositories/bookmark.repository';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bookmark.name, schema: BookmarkSchema },
    ]),
  ],
  controllers: [BookmarkController],
  providers: [BookmarkService, BookmarkRepository],
})
export class BookmarkModule {}
