class PostsController < ApplicationController
  def index
    @posts = Post.includes(:user).order("score DESC")
    
    
  end

  def new
    @post = Post.new

  end

  def create
    if Post.create(post_params)
      redirect_to new_post_path
    else
      render action: :new
    end
  end
  
  def show
    @post =  Post.find(params[:id])
  end
  
  
  
  
  private
  def post_params
   params.require(:post).permit(:score).merge(user_id: current_user.id)
  end


end
