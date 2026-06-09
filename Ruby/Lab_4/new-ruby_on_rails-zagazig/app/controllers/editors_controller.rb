class EditorsController < ApplicationController
  before_action :set_editor, only: %i[ show edit update destroy ]

  # GET /editors or /editors.json
  def index
    @editors = Editor.all
  end

  # GET /editors/1 or /editors/1.json
  def show
  end

  # GET /editors/new
  def new
    @editor = Editor.new
  end

  # GET /editors/1/edit
  def edit
  end

  # POST /editors or /editors.json
  def create
    @editor = Editor.new(editor_params)

    respond_to do |format|
      if @editor.save
        format.html { redirect_to @editor, notice: "Editor was successfully created." }
        format.json { render :show, status: :created, location: @editor }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @editor.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /editors/1 or /editors/1.json
  def update
    respond_to do |format|
      if @editor.update(editor_params)
        format.html { redirect_to @editor, notice: "Editor was successfully updated.", status: :see_other }
        format.json { render :show, status: :ok, location: @editor }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @editor.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /editors/1 or /editors/1.json
  def destroy
    @editor.destroy!

    respond_to do |format|
      format.html { redirect_to editors_path, notice: "Editor was successfully destroyed.", status: :see_other }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_editor
      @editor = Editor.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def editor_params
      params.expect(editor: [ :name ])
    end
end
