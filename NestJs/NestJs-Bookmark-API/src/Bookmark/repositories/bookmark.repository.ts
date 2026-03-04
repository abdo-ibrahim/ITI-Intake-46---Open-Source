import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookmarkDto } from '../dto/create-bookmark.dto';
import { UpdateBookmarkDto } from '../dto/update-bookmark.dto';
import { Bookmark, BookmarkDocument } from '../schemas/bookmark.schema';
@Injectable()
export class BookmarkRepository {
  constructor(
    @InjectModel(Bookmark.name) private bookmarkModel: Model<BookmarkDocument>,
  ) {}
  async create(createBookmarkDto: CreateBookmarkDto): Promise<Bookmark> {
    const createdBookmark = new this.bookmarkModel(createBookmarkDto);
    return createdBookmark.save();
  }

  async findAll(): Promise<Bookmark[]> {
    return this.bookmarkModel.find().exec();
  }

  async findById(id: string): Promise<Bookmark | null> {
    return this.bookmarkModel.findById(id).exec();
  }

  async update(
    id: string,
    updateData: UpdateBookmarkDto,
  ): Promise<Bookmark | null> {
    return this.bookmarkModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Bookmark | null> {
    return this.bookmarkModel.findByIdAndDelete(id).exec();
  }
}
