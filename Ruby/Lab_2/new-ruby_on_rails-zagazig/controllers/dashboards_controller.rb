class DashboardsController < ApplicationController

  def index
    @dashboards = Dashboard.all
  end

  def show
    @dashboard = Dashboard.find(params[:id])
  end

  def new
    @dashboard = Dashboard.new
  end

  def create
    @dashboard = Dashboard.new(dashboard_params)

    if @dashboard.save
      redirect_to dashboards_path, notice: "Dashboard was successfully created!"
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @dashboard = Dashboard.find(params[:id])
  end

  def update
    @dashboard = Dashboard.find(params[:id])

    if @dashboard.update(dashboard_params)
      redirect_to dashboard_path(@dashboard), notice: "Dashboard was successfully updated!"
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @dashboard = Dashboard.find(params[:id])
    @dashboard.destroy
    redirect_to dashboards_path, notice: "Dashboard was successfully deleted!"
  end

  private

  def dashboard_params
    params.require(:dashboard).permit(:name, :widgets_count)
  end
end