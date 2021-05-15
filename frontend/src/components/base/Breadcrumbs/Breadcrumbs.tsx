import { Breadcrumb } from "antd";
import * as React from "react";
import { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";

interface IBreadCrumbsProps {
  routes: any[];
}

const BreadCrumbs: React.FunctionComponent<IBreadCrumbsProps> = (props) => {
  const { routes } = props;
  const router: any = useRouteMatch();
  const [crumbs, setCrumbs] = useState<any>([]);

  React.useEffect(() => {
    const crumbs = routes
      // Get all routes that contain the current one.
      .filter(({ path }) => router.path.includes(path))
      .map(({ path, ...rest }) => ({
        path: Object.keys(router.params).length
          ? Object.keys(router.params).reduce(
              (path, param) => path.replace(`:${param}`, router.params[param]),
              path
            )
          : path,
        ...rest,
      }));
    setCrumbs(crumbs);
  }, []);

  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      {crumbs.map((crumb: any, index: number) => (
        <Breadcrumb.Item key={`${index}-${crumb.title}`}>
          <Link className='link' to={crumb.path}>
            {crumb.title}
          </Link>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadCrumbs;
