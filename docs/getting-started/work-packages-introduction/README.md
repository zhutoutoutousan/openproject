---
sidebar_navigation:
  title: Work packages introduction
  priority: 700
description: Introduction to work packages in OpenProject.
robots: index, follow
keywords: work packages introduction
---

# Introduction to Work Packages

In this document you will get a first introduction to work packages. You will find out how to create and update work packages in a project.

For further documentation, please visit our [user guide for work packages](../../user-guide/work-packages).

| Feature                                                      | Documentation for                                         |
| ------------------------------------------------------------ | --------------------------------------------------------- |
| [What is a work package?](#what-is-a-work-package?)          | Find out what is a work package in OpenProject.           |
| [Create a new work package](#create-a-new-work-package)      | How to create a new work package in  a project?           |
| [Open and edit a work package](#open-and-edit-a-work-package) | How to open and make changes to an existing work package? |
| [Activity of work packages](#activity-of-work-packages)      | See all changes in a work package.                        |
| [Configure work package table](#configure-work-package-table) | How to use filters to display the work package list?      |

## What is a work package?

A work package in OpenProject can basically be everything you need to keep track off within your projects. It can be e.g. a task, a feature, a bug, a risk, a milestone or a project phase. This different kinds of work packages are called work package types.

## Create a new work package

To get started, create a new work package in your project, [open the project](#open-an-existing-project) with the project drop-down menu, navigate to the **module work packages** in the project menu.

Within the work packages module, click the green + Work package button to create a new work package. In the drop down menu, choose which type of work package you want to create, e.g. a task, a 

![create-work-package](create-work-package-1569611257373.png)

A split screen view is opened with the new work package form on the right and the list of already existing work packages on the left.

If there are not yet any work packages in the project, you will see a message that there are no work packages to be displayed in the list.

In the empty form on the right, you can enter all relevant information for this work package, e.g. the subject and a description, set an assignee, a due date or any other field. Also, you can add attachments with copy & paste or with drag and drop.

Click the green **Save** button to create the work package.

![split-screen-work-packages](split-screen-work-packages.png)

The work package will the be displayed in the list view:

![list-view-work-package](1569611758166.png)

## Open and edit a work package

To open and edit an existing work package from the list, select the work package in the list which you want to edit and click on the **open details view** icon in the work package list or on top of the list to open the split screen view.

![open-details-view-work-packages](open-details-view-work-packages.png)

By clicking through the list on the left hand side you will see the details of each work package on the right in the split screen.

Click in any of the fields to **update a work package**, e.g. description. Click the checkmark at the bottom of the input field to save changes.

![edit-work-package](1569612205009.png)

To **update the status**, click on the highlighted displayed status on top of the form and select the new status from the drop-down.

![update-status](1569612428626.png)

## Activity of work packages

To keep informed about all changes to a work package, open the **ACTIVITY** tab in the details view. 

Here you will see all changes which have been made to this work package.

You can also insert a comment at the end of the Activity list.

![activity-work-packages](activity-work-packages.png)



## Configure work package table

You can configure the work package table view in OpenProject to display the information that you need in the list.

You can change the header in the table and add or remove columns, filter and group work packages or sort them according to a specific criteria. Save the view to have it available directly from your project menu.

Also, you can change between a flat list view and a hierarchy view.

To open the work package table configuration, open the **Settings** icon with the three dots at the top right of the work package table.

![configure-work-package-table](configure-work-package-table.png)

**Add or remove columns in the work package table**

To configure the view of the work package table and have different attributes displayed in the list you can add or remove columns in the work package list.

First, [open the work package table configuration](#work-package-table-configuration).

In the pop-up window, choose the tab **Columns**.

You can add columns by typing the name of the attribute which you would like to add.

You can remove columns by clicking the **x** icon.

You order the attributes in the list with drag and drop.

![columns](1566395294543.png)

Clicking the **Apply** button will save your changes and adapt the table according to your configuration.

![columns](1566395078197.png)

 **Filter work packages**

In the work package list there will soon be quite a lot of work packages in a project. To filter the work packages in the list, click on the **Filter** button on top of the work packages view. The number next to it tells you how many filter criteria you have applied to a list.

In this example 1 filter criteria: Status = open.

![filter-work-packages](filter-work-packages.png)

To add a filter criteria, click the **+ Add filter:** button in the grey filter area. You can choose a filter criteria from the drop-down list or start typing to search for a criteria.

![add-filter](add-filter.png)

You can add as many filter criteria as needed. 
Also, you can filter by [custom fields](../../../system-admin-guide/custom-fields) if you set this in the custom field configuration.

If you want to search for specific text in the subject, description or comments of a work package, type in the **Filter by text** the expression you want to filter for.

The results will be displayed accordingly in the work package list.

![filter-text](filter-text.png)



To find out more about the work package functionalities, please visit our detailed [user guide for work packages](../../user-guide/work-packages).

