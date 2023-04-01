import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import * as CustomError from "../errors";
import PostModel from "../models/postModel";
import { asyncWrapper } from "../utils";

export const getPosts = asyncWrapper(
  async (_req: Request, _res: Response, _next: NextFunction) => {
	// Show detailed posts with user info
    let posts = await PostModel.find();
    posts = await PostModel.populate(posts, {
      path: "createdBy comments.sentBy comments.liked",
      select: "name email",
    });
    _res.status(StatusCodes.OK).json(posts);
  }
);

export const createPost = asyncWrapper(
  async (_req: Request, _res: Response, _next: NextFunction) => {
    const post = await PostModel.create({
      createdBy: _req.user,
      ..._req.body,
    });
    _res.status(StatusCodes.CREATED).json(post);
  }
);

export const patchPost = asyncWrapper(
  async (_req: Request, _res: Response, _next: NextFunction) => {
    const post = await PostModel.findById(_req.params.postId);
    if (!post) return _next(new CustomError.NotFoundError("Post not found"));
    if (!post.createdBy.equals(_req.user))
      return _next(
        new CustomError.ForbiddenError(
          "You are not authorized to edit this post"
        )
      );
    post.set(_req.body);
    await post.save();
    _res.status(StatusCodes.OK).json(post);
  }
);

export const deletePost = asyncWrapper(
  async (_req: Request, _res: Response, _next: NextFunction) => {
    const post = await PostModel.findById(_req.params.postId);
    if (!post) return _next(new CustomError.NotFoundError("Post not found"));
    if (!post.createdBy.equals(_req.user))
      return _next(
        new CustomError.ForbiddenError(
          "You are not authorized to edit this post"
        )
      );
    await PostModel.findByIdAndDelete(_req.params.postId);
    _res.status(StatusCodes.NO_CONTENT).json(post);
  }
);

export const addComment = asyncWrapper(
  async (_req: Request, _res: Response, _next: NextFunction) => {
    const post = await PostModel.findById(_req.params.postId);
    if (!post) _next(new CustomError.NotFoundError("Post not found"));
    else {
      post.comments.push({
        ..._req.body,
        sentBy: _req.user,
      });
      await post.save();
      _res.status(StatusCodes.CREATED).json(post);
    }
  }
);

export const likeComment = asyncWrapper(
  async (_req: Request, _res: Response, _next: NextFunction) => {
    const post = await PostModel.findById(_req.params.postId).select(
      "comments"
    );
    if (!post) _next(new CustomError.NotFoundError("Post not found"));
    else {
      const comment = post.comments.find((comment) =>
        comment._id?.equals(_req.params.commentId)
      );
      if (!comment) _next(new CustomError.NotFoundError("Comment not found"));
      else if (comment.liked.includes(_req.user))
        _next(new CustomError.BadRequestError("Comment already liked"));
      else {
        comment.liked.push(_req.user);
        await post.save();
        _res.status(StatusCodes.OK).json(post);
      }
    }
  }
);
