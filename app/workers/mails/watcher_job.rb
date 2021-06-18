#-- encoding: UTF-8

#-- copyright
# OpenProject is an open source project management software.
# Copyright (C) 2012-2021 the OpenProject GmbH
#
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License version 3.
#
# OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
# Copyright (C) 2006-2013 Jean-Philippe Lang
# Copyright (C) 2010-2013 the ChiliProject Team
#
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License
# as published by the Free Software Foundation; either version 2
# of the License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
#
# See docs/COPYRIGHT.rdoc for more details.
#++

class Mails::WatcherJob < Mails::DeliverJob
  def perform(watcher, watcher_changer)
    self.watcher = watcher

    super(watcher.user, watcher_changer)
  end

  def render_mail(recipient:, sender:)
    UserMailer
      .work_package_watcher_changed(watcher.watchable,
                                    recipient,
                                    sender,
                                    action)
  end

  private

  attr_accessor :watcher

  def abort?
    super || !notify_about_watcher_changed?
  end

  def notify_about_watcher_changed?
    return false if notify_about_self_watching?
    return false unless UserMailer.perform_deliveries

    case watcher.user.mail_notification
    when 'only_my_events'
      true
    when 'selected'
      watching_selected_includes_project?
    else
      watcher.user.notify_about?(watcher.watchable)
    end
  end

  def notify_about_self_watching?
    watcher.user == sender && !sender.pref.self_notified?
  end

  def watching_selected_includes_project?
    watcher.user.notified_projects_ids.include?(watcher.watchable.project_id)
  end

  def action
    raise NotImplementedError, 'subclass responsibility'
  end
end
