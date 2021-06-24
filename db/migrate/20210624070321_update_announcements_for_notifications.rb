class UpdateAnnouncementsForNotifications < ActiveRecord::Migration[6.1]
  def change
    change_table :announcements do |t|
      t.column :title, :text, null: true
      t.column :send_notification, :boolean, null: false, default: false
    end

    reversible do |dir|
      dir.up { Announcement.update_all title: I18n.t(:label_announcement, locale: Setting.default_language) }
    end

    change_column_null :announcements, :title, false
  end
end
